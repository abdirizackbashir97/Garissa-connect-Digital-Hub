import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowRight, Store } from "lucide-react";

const BUSINESS_KEYS = ["biz1", "biz2", "biz3"];

export default function FeaturedBusinesses() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2>{t("businesses.heading")}</h2>
            <p className="mt-3 text-brand-neutral-600">
              {t("businesses.subhead")}
            </p>
          </div>

          <Link
            to="/businesses"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-green-700 hover:text-brand-green-600"
          >
            {t("businesses.viewAll")}
            <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_KEYS.map((key) => (
            <Link
              key={key}
              to={`/businesses/${key}`}
              className="group flex flex-col rounded-lg border border-brand-neutral-200 bg-white p-6 transition-all hover:border-brand-green-500 hover:shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-gold-100 text-brand-gold-600">
                <Store size={18} aria-hidden="true" />
              </span>

              <h3 className="mt-4 text-lg">
                {t(`businesses.${key}Name`)}
              </h3>

              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-green-700">
                {t(`businesses.${key}Category`)}
              </p>

              <p className="mt-3 flex-1 text-sm text-brand-neutral-600">
                {t(`businesses.${key}Desc`)}
              </p>

              <p className="mt-4 inline-flex items-center gap-1 text-sm text-brand-neutral-600">
                <MapPin size={14} aria-hidden="true" />
                {t(`businesses.${key}Location`)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}