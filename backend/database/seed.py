"""
GarissaConnect — Demo Data Seeder
==================================

Populates the SQLite3 database with:
  - 12 service categories
  - 24 demo services (2 per category)

IMPORTANT: All services are DEMO DATA.
Provider names, phones, and emails are fictional placeholders.
Do not treat any of these records as real Garissa businesses.

Safe to re-run: existing records are skipped, not duplicated.
"""

import sqlite3
from pathlib import Path

# Path to the database, relative to this file's location
DB_PATH = Path(__file__).parent / "garissaconnect.db"


# ============================================================
# Categories
# ============================================================
CATEGORIES = [
    ("ICT & Technology",              "Computer, phone, internet and software services.", "💻"),
    ("Education & Training",          "Schools, training centres and tutors.",            "📚"),
    ("Health & Wellness",             "Clinics, pharmacies and medical services.",        "🏥"),
    ("Transport",                     "Taxis, car hire and vehicle services.",            "🚗"),
    ("Food & Restaurants",            "Restaurants, cafes, catering and bakeries.",       "🍽️"),
    ("Accommodation",                 "Hotels, guest houses and lodges.",                 "🏨"),
    ("Business & Shops",              "Retail shops, wholesalers and suppliers.",         "🏪"),
    ("Repairs & Maintenance",         "Electronics, appliances and equipment repair.",    "🔧"),
    ("Professional Services",         "Legal, accounting and consulting services.",       "💼"),
    ("Beauty & Personal Care",        "Salons, barbershops and personal care.",           "💅"),
    ("Construction & Home Services",  "Builders, plumbers and home improvement.",         "🏗️"),
    ("Events & Photography",          "Event planning, photography and videography.",     "📸"),
]


# ============================================================
# Demo services
# ------------------------------------------------------------
# Each tuple: (category_name, service_name, description, provider, location, index)
# The `index` is used to build fake phone/email: 001, 002, 003...
# ============================================================
SERVICES = [
    # --- ICT & Technology ---
    ("ICT & Technology", "Computer Repair",
     "Diagnostics, hardware repair and software troubleshooting for desktop and laptop computers.",
     "Demo Tech Hub", "Garissa Town", 1),
    ("ICT & Technology", "Web Development",
     "Custom websites and web applications for small businesses and organizations.",
     "Demo Dev Studio", "Garissa Town", 2),

    # --- Education & Training ---
    ("Education & Training", "Driving School",
     "Beginner to advanced driving lessons with certified instructors.",
     "Demo Driving Academy", "Garissa Town", 3),
    ("Education & Training", "Computer Training",
     "Short courses in office software, programming basics and digital literacy.",
     "Demo Learning Center", "Garissa Town", 4),

    # --- Health & Wellness ---
    ("Health & Wellness", "Pharmacy",
     "Prescription and over-the-counter medicines with qualified staff.",
     "Demo Pharmacy", "Garissa Town", 5),
    ("Health & Wellness", "Dental Services",
     "Check-ups, cleaning, fillings and basic dental procedures.",
     "Demo Dental Clinic", "Garissa Town", 6),

    # --- Transport ---
    ("Transport", "Taxi Service",
     "Reliable local and inter-town taxi service. Available on call.",
     "Demo Taxi Services", "Garissa Town", 7),
    ("Transport", "Car Hire",
     "Self-drive and chauffeur-driven car hire for business or personal trips.",
     "Demo Car Hire", "Garissa Town", 8),

    # --- Food & Restaurants ---
    ("Food & Restaurants", "Restaurant",
     "Local and international cuisine served in a family-friendly setting.",
     "Demo Restaurant", "Garissa Town", 9),
    ("Food & Restaurants", "Catering Service",
     "Event catering for weddings, meetings and community functions.",
     "Demo Caterers", "Garissa County", 10),

    # --- Accommodation ---
    ("Accommodation", "Guest House",
     "Affordable overnight accommodation with basic amenities.",
     "Demo Guest House", "Garissa Town", 11),
    ("Accommodation", "Hotel",
     "Comfortable rooms and conference facilities for business travellers.",
     "Demo Hotel", "Garissa Town", 12),

    # --- Business & Shops ---
    ("Business & Shops", "Retail Shop",
     "General retail goods including household items and personal care products.",
     "Demo Retail", "Garissa Town", 13),
    ("Business & Shops", "Wholesale Supplier",
     "Bulk supply of goods for shops, kiosks and small businesses.",
     "Demo Wholesalers", "Garissa Town", 14),

    # --- Repairs & Maintenance ---
    ("Repairs & Maintenance", "Electronics Repair",
     "Repair of TVs, radios, phones and small electronic devices.",
     "Demo Electronics", "Garissa Town", 15),
    ("Repairs & Maintenance", "Appliance Repair",
     "Fridges, washing machines, cookers and other home appliances.",
     "Demo Appliance Repair", "Garissa Town", 16),

    # --- Professional Services ---
    ("Professional Services", "Legal Advisory",
     "Legal consultation and documentation services for individuals and businesses.",
     "Demo Legal Services", "Garissa Town", 17),
    ("Professional Services", "Accounting Services",
     "Bookkeeping, tax filing and small business accounting support.",
     "Demo Accountants", "Garissa Town", 18),

    # --- Beauty & Personal Care ---
    ("Beauty & Personal Care", "Beauty Salon",
     "Hair, nails, makeup and skincare services in a modern setting.",
     "Demo Beauty Salon", "Garissa Town", 19),
    ("Beauty & Personal Care", "Barbershop",
     "Haircuts, shaves and grooming services for men and boys.",
     "Demo Barbershop", "Garissa Town", 20),

    # --- Construction & Home Services ---
    ("Construction & Home Services", "Home Construction",
     "Residential building services from foundation to finishing.",
     "Demo Builders", "Garissa County", 21),
    ("Construction & Home Services", "Plumbing Services",
     "Installation, repair and maintenance of water and drainage systems.",
     "Demo Plumbers", "Garissa Town", 22),

    # --- Events & Photography ---
    ("Events & Photography", "Event Photography",
     "Professional photography for weddings, graduations and corporate events.",
     "Demo Photography", "Garissa County", 23),
    ("Events & Photography", "Event Planning",
     "Full event planning and coordination for private and public functions.",
     "Demo Event Planners", "Garissa Town", 24),
]


def make_phone(n):
    """Return a clearly-fake sequential phone number for demo record N."""
    return f"+254-700-000-{n:03d}"


def make_email(n):
    """.example is reserved for documentation and never routes anywhere real."""
    return f"demo{n:03d}@garissaconnect.example"


def seed():
    if not DB_PATH.exists():
        print(f"ERROR: Database not found at {DB_PATH}")
        print("Run the schema first: python -c \"import sqlite3,pathlib; ...\"")
        return

    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON;")
    cur = conn.cursor()

    # ---------- Categories ----------
    # INSERT OR IGNORE uses the UNIQUE constraint on `name`
    # to skip categories that already exist. Safe to re-run.
    for name, description, icon in CATEGORIES:
        cur.execute(
            "INSERT OR IGNORE INTO categories (name, description, icon) VALUES (?, ?, ?)",
            (name, description, icon),
        )
    print(f"Categories inserted/verified: {len(CATEGORIES)}")

    # Build a lookup: category name -> id
    cur.execute("SELECT id, name FROM categories")
    category_ids = {row[1]: row[0] for row in cur.fetchall()}

    # ---------- Services ----------
    # Only seed services if the table is empty.
    # This way, if you add real services later, re-running this script
    # won't touch them.
    cur.execute("SELECT COUNT(*) FROM services")
    existing = cur.fetchone()[0]

    if existing > 0:
        print(f"Services already present ({existing}). Skipping service seed.")
    else:
        for cat_name, name, desc, provider, location, idx in SERVICES:
            cat_id = category_ids.get(cat_name)
            if cat_id is None:
                print(f"WARNING: unknown category '{cat_name}' — skipping '{name}'")
                continue

            cur.execute(
                """
                INSERT INTO services
                    (name, description, category_id, provider_name, phone, email,
                     location, image, is_verified, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    name,
                    desc,
                    cat_id,
                    provider,
                    make_phone(idx),
                    make_email(idx),
                    location,
                    None,          # no image yet
                    0,             # not verified — these are demo records
                    1,             # active
                ),
            )
        print(f"Services inserted: {len(SERVICES)}")

    conn.commit()
    conn.close()
    print(f"Done. Database at: {DB_PATH}")


if __name__ == "__main__":
    seed()
