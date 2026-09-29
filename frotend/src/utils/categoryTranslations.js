export const CATEGORY_KEY_BY_NAME = {
  "ICT & Technology":               "ict",
  "Education & Training":           "education",
  "Health & Wellness":              "health",
  "Transport":                      "transport",
  "Food & Restaurants":             "food",
  "Accommodation":                  "accommodation",
  "Business & Shops":               "business",
  "Repairs & Maintenance":          "repairs",
  "Professional Services":          "professional",
  "Beauty & Personal Care":         "beauty",
  "Construction & Home Services":   "construction",
  "Events & Photography":           "events",
};

/**
 * English DB name → i18n key suffix.
 * "ICT & Technology" → "ict"
 * Returns null if not recognised.
 */
export function categoryKey(name) {
  if (!name) return null;
  return CATEGORY_KEY_BY_NAME[name] || null;
}

/**
 * i18n key suffix → English DB name.
 * "ict" → "ICT & Technology"
 * Returns null if not recognised.
 */
export function categoryNameFromKey(key) {
  if (!key) return null;
  for (const [name, k] of Object.entries(CATEGORY_KEY_BY_NAME)) {
    if (k === key) return name;
  }
  return null;
}

export default {
  CATEGORY_KEY_BY_NAME,
  categoryKey,
  categoryNameFromKey,
};