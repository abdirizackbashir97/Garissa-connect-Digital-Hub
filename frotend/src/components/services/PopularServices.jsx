import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import useServices from "../../hooks/useServices";
import ServiceCard from "./ServiceCard";
import { categoryKey } from "../../utils/categoryTranslations";

export default function PopularServices({ search, category }) {
  const { t } = useTranslation();

  const filters = {};
  if (search && search.trim()) filters.search = search.trim();
  if (category) filters.category = category;

  const { services, loading, error } = useServices(filters);

  const hasFilters = Object.keys(filters).length > 0;
  const count = services.length;
  const serviceWord =
    count === 1
      ? t("servicesPage.popularServiceSingular")
      : t("servicesPage.popularServicePlural");

  // Translate the active category name for the "in <category>" label
  const activeCatDisplay = (() => {
    if (!category) return "";
    const key = categoryKey(category);
    return key ? t(`servicesCategories.${key}`) : category;
  })();

  return (
    <section className="bg-brand-neutral-50">
      <div className="gcx-container gcx-section">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {hasFilters
                ? t("servicesPage.popularEyebrowFiltered")
                : t("servicesPage.popularEyebrow")}
            </span>
            <h2 className="mt-2">
              {hasFilters
                ? t("servicesPage.popularHeadingFiltered")
                : t("servicesPage.popularHeading")}
            </h2>
          </div>
          {!loading && !error && (
            <p className="text-sm text-brand-neutral-500">
              {count} {serviceWord}
              {category
                ? ` ${t("servicesPage.popularInCategory")} "${activeCatDisplay}"`
                : ""}
              {search
                ? ` ${t("servicesPage.popularMatching")} "${search}"`
                : ""}
            </p>
          )}
        </div>

        {loading && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-white" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-800">
              {t("servicesPage.popularErrorTitle")}
            </p>
            <p className="mt-1 text-xs text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="mt-10 rounded-xl border border-brand-neutral-200 bg-white p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg">
              {t("servicesPage.popularEmptyTitle")}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-brand-neutral-600">
              {t("servicesPage.popularEmptyBody")}
            </p>
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}