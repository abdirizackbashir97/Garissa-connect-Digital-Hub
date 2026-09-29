"""
GarissaConnect — Flask API Entry Point
=======================================

Routes:
    GET     /                       → plain text greeting
    GET     /api/health             → JSON status

    GET     /api/categories         → list every category
    GET     /api/categories/<id>    → single category

    GET     /api/services           → list services (supports filters)
    GET     /api/services/<id>      → single service with category details
    POST    /api/services           → create a service
    PUT     /api/services/<id>      → update a service
    DELETE  /api/services/<id>      → soft-delete a service (is_active = 0)

Run:
    python app.py
Then visit http://localhost:5000
"""

import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

from db import fetch_all, fetch_one, execute_write

# ---------- Create the Flask app ----------
app = Flask(__name__)

# ---------- Enable CORS ----------
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


# ============================================================
# Base routes
# ============================================================

@app.route("/", methods=["GET"])
def index():
    return "GarissaConnect API — running"


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "GarissaConnect API",
        "version": "0.1.0",
    })


# ============================================================
# Categories
# ============================================================

@app.route("/api/categories", methods=["GET"])
def list_categories():
    categories = fetch_all(
        """
        SELECT id, name, description, icon, created_at
        FROM categories
        ORDER BY name ASC
        """
    )
    return jsonify(categories)


@app.route("/api/categories/<int:category_id>", methods=["GET"])
def get_category(category_id):
    category = fetch_one(
        """
        SELECT id, name, description, icon, created_at
        FROM categories
        WHERE id = ?
        """,
        (category_id,),
    )
    if category is None:
        return jsonify({"error": "Category not found"}), 404
    return jsonify(category)


# ============================================================
# Services — read
# ============================================================

@app.route("/api/services", methods=["GET"])
def list_services():
    """
    Return services, optionally filtered.

    Query parameters (all optional):
        ?category=ICT & Technology    exact match on category name
        ?location=Garissa             partial match on location
        ?search=computer              partial match on name OR description
        ?verified=true                only verified services
        ?active=false                 include inactive services
    """
    category   = request.args.get("category", "").strip()
    location   = request.args.get("location", "").strip()
    search     = request.args.get("search", "").strip()
    verified   = request.args.get("verified", "").strip().lower()
    active_raw = request.args.get("active", "true").strip().lower()
    active_only = active_raw != "false"

    where = []
    params = []

    if active_only:
        where.append("s.is_active = 1")

    if category:
        where.append("c.name = ?")
        params.append(category)

    if location:
        where.append("s.location LIKE ?")
        params.append(f"%{location}%")

    if search:
        where.append("(s.name LIKE ? OR s.description LIKE ?)")
        like = f"%{search}%"
        params.extend([like, like])

    if verified == "true":
        where.append("s.is_verified = 1")

    where_sql = ("WHERE " + " AND ".join(where)) if where else ""

    sql = f"""
        SELECT
            s.id, s.name, s.description, s.category_id,
            s.provider_name, s.phone, s.email, s.location,
            s.image, s.is_verified, s.is_active, s.created_at,
            c.name AS category_name,
            c.icon AS category_icon
        FROM services s
        JOIN categories c ON c.id = s.category_id
        {where_sql}
        ORDER BY s.is_verified DESC, s.name ASC
    """

    services = fetch_all(sql, tuple(params))
    return jsonify(services)


@app.route("/api/services/<int:service_id>", methods=["GET"])
def get_service(service_id):
    service = fetch_one(
        """
        SELECT
            s.id, s.name, s.description, s.category_id,
            s.provider_name, s.phone, s.email, s.location,
            s.image, s.is_verified, s.is_active, s.created_at,
            c.name AS category_name,
            c.icon AS category_icon
        FROM services s
        JOIN categories c ON c.id = s.category_id
        WHERE s.id = ?
        """,
        (service_id,),
    )
    if service is None:
        return jsonify({"error": "Service not found"}), 404
    return jsonify(service)


# ============================================================
# Services — write
# ============================================================

def _validate_service_payload(data, *, is_update=False):
    """
    Returns (error_message_or_None, cleaned_dict).
    On create (is_update=False), `name` and `category_id` are required.
    """
    if not isinstance(data, dict):
        return "Request body must be a JSON object", {}

    cleaned = {}

    # ----- name -----
    if "name" in data:
        name = str(data["name"]).strip()
        if not name:
            return "Field 'name' cannot be empty", {}
        cleaned["name"] = name
    elif not is_update:
        return "Field 'name' is required", {}

    # ----- category_id -----
    if "category_id" in data:
        try:
            cat_id = int(data["category_id"])
        except (TypeError, ValueError):
            return "Field 'category_id' must be an integer", {}
        if cat_id <= 0:
            return "Field 'category_id' must be a positive integer", {}
        exists = fetch_one("SELECT id FROM categories WHERE id = ?", (cat_id,))
        if exists is None:
            return f"Category with id {cat_id} does not exist", {}
        cleaned["category_id"] = cat_id
    elif not is_update:
        return "Field 'category_id' is required", {}

    # ----- optional text fields -----
    for field in ["description", "provider_name", "phone", "email", "location", "image"]:
        if field in data:
            value = data[field]
            cleaned[field] = None if value is None else str(value).strip()

    # ----- boolean-ish fields -----
    for field in ["is_verified", "is_active"]:
        if field in data:
            raw = data[field]
            if isinstance(raw, bool):
                cleaned[field] = 1 if raw else 0
            elif isinstance(raw, int) and raw in (0, 1):
                cleaned[field] = raw
            elif isinstance(raw, str) and raw.lower() in ("true", "false", "1", "0"):
                cleaned[field] = 1 if raw.lower() in ("true", "1") else 0
            else:
                return f"Field '{field}' must be a boolean (true/false)", {}

    return None, cleaned


@app.route("/api/services", methods=["POST"])
def create_service():
    """
    Create a new service.

    Required JSON fields:
        name          (string)
        category_id   (integer, must exist)

    Optional JSON fields:
        description, provider_name, phone, email, location, image,
        is_verified, is_active

    Returns 201 Created with the new record on success.
    """
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Request body must be valid JSON"}), 400

    error, cleaned = _validate_service_payload(data, is_update=False)
    if error:
        return jsonify({"error": error}), 400

    cleaned.setdefault("description", None)
    cleaned.setdefault("provider_name", None)
    cleaned.setdefault("phone", None)
    cleaned.setdefault("email", None)
    cleaned.setdefault("location", None)
    cleaned.setdefault("image", None)
    cleaned.setdefault("is_verified", 0)
    cleaned.setdefault("is_active", 1)

    columns = [
        "name", "description", "category_id",
        "provider_name", "phone", "email", "location",
        "image", "is_verified", "is_active",
    ]
    placeholders = ", ".join("?" * len(columns))
    values = [cleaned[col] for col in columns]

    try:
        new_id = execute_write(
            f"INSERT INTO services ({', '.join(columns)}) VALUES ({placeholders})",
            tuple(values),
        )
    except sqlite3.Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500

    created = fetch_one(
        """
        SELECT
            s.id, s.name, s.description, s.category_id,
            s.provider_name, s.phone, s.email, s.location,
            s.image, s.is_verified, s.is_active, s.created_at,
            c.name AS category_name,
            c.icon AS category_icon
        FROM services s
        JOIN categories c ON c.id = s.category_id
        WHERE s.id = ?
        """,
        (new_id,),
    )
    return jsonify(created), 201


@app.route("/api/services/<int:service_id>", methods=["PUT"])
def update_service(service_id):
    """
    Update an existing service. Only fields provided are changed.
    Returns the updated record on success.
    """
    existing = fetch_one("SELECT id FROM services WHERE id = ?", (service_id,))
    if existing is None:
        return jsonify({"error": "Service not found"}), 404

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Request body must be valid JSON"}), 400

    error, cleaned = _validate_service_payload(data, is_update=True)
    if error:
        return jsonify({"error": error}), 400

    if not cleaned:
        return jsonify({"error": "No fields to update"}), 400

    set_parts = [f"{col} = ?" for col in cleaned.keys()]
    values = list(cleaned.values()) + [service_id]

    try:
        execute_write(
            f"UPDATE services SET {', '.join(set_parts)} WHERE id = ?",
            tuple(values),
        )
    except sqlite3.Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500

    updated = fetch_one(
        """
        SELECT
            s.id, s.name, s.description, s.category_id,
            s.provider_name, s.phone, s.email, s.location,
            s.image, s.is_verified, s.is_active, s.created_at,
            c.name AS category_name,
            c.icon AS category_icon
        FROM services s
        JOIN categories c ON c.id = s.category_id
        WHERE s.id = ?
        """,
        (service_id,),
    )
    return jsonify(updated)


@app.route("/api/services/<int:service_id>", methods=["DELETE"])
def delete_service(service_id):
    """
    Soft-delete a service: sets is_active = 0.
    The row stays in the database and can be reactivated with PUT.
    """
    existing = fetch_one("SELECT id FROM services WHERE id = ?", (service_id,))
    if existing is None:
        return jsonify({"error": "Service not found"}), 404

    try:
        execute_write(
            "UPDATE services SET is_active = 0 WHERE id = ?",
            (service_id,),
        )
    except sqlite3.Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500

    updated = fetch_one(
        """
        SELECT
            s.id, s.name, s.description, s.category_id,
            s.provider_name, s.phone, s.email, s.location,
            s.image, s.is_verified, s.is_active, s.created_at,
            c.name AS category_name,
            c.icon AS category_icon
        FROM services s
        JOIN categories c ON c.id = s.category_id
        WHERE s.id = ?
        """,
        (service_id,),
    )
    return jsonify(updated)


# ============================================================
# Entry point
# ============================================================
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)