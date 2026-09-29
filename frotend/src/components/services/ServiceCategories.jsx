// src/components/services/ServiceCategories.jsx
//
// Grid of service categories. Each tile links to the category page.

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

import useCategories from "../../hooks/useCategories";
import { categoryKey } from "../../utils/categoryTranslations";

export default function ServiceCategories() {
  const { t } = useTranslation();
  const { categories, loading, error } = useCategories();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {t("servicesPage.categoriesEyebrow")}
            </span>
            <h2 className="mt-2">{t("servicesPage.categoriesHeading")}</h2>
            <p className="mt-2 text-sm text-brand-neutral-600">
              {t("servicesPage.categoriesSubhead")}
            </p>
          </div>
        </div>

        {loading && (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-xl bg-brand-neutral-100"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-800">
              {t("servicesPage.categoriesErrorTitle")}
            </p>
            <p className="mt-1 text-xs text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <p className="mt-10 text-center text-sm text-brand-neutral-500">
            {t("servicesPage.categoriesEmpty")}
          </p>
        )}

        {!loading && !error && categories.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {categories.map((cat) => {
              const key = categoryKey(cat.name);
              return (
                <Link
                  key={cat.id}
                  to={`/services/category/${key}`}
                  className="group flex flex-col items-start rounded-xl border border-brand-neutral-200 bg-white p-4 text-start transition-all duration-150 hover:-translate-y-0.5 hover:border-brand-green-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500"
                >
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {cat.icon || "•"}
                  </span>
                  <span className="mt-3 text-sm font-semibold leading-tight text-brand-neutral-900">
                    {t(`servicesCategories.${key}`, {
                      defaultValue: cat.name,
                    })}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs text-brand-neutral-500">
                    {t(`servicesCategoriesDesc.${key}`, {
                      defaultValue: cat.description,
                    })}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-green-700 opacity-0 transition group-hover:opacity-100">
                    {t("servicesPage.categoriesExplore")}
                    <ArrowRight
                      size={12}
                      className="rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
