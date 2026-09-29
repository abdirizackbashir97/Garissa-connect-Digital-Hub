import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Clock, ArrowRight } from "lucide-react";

const OPPORTUNITY_KEYS = ["op1", "op2", "op3"];

export default function FeaturedOpportunities() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2>{t("opportunities.heading")}</h2>
            <p className="mt-3 text-brand-neutral-600">
              {t("opportunities.subhead")}
            </p>
          </div>

          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-green-700 hover:text-brand-green-600"
          >
            {t("opportunities.viewAll")}
            <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 divide-y divide-brand-neutral-200 border-y border-brand-neutral-200">
          {OPPORTUNITY_KEYS.map((key) => (
            <li key={key}>
              <Link
                to={`/opportunities/${key}`}
                className="group flex flex-col gap-3 py-6 transition-colors hover:bg-brand-neutral-50 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-brand-green-700">
                    {t(`opportunities.${key}Type`)}
                  </p>
                  <h3 className="mt-1 text-lg">
                    {t(`opportunities.${key}Title`)}
                  </h3>
                  <p className="mt-1 text-sm text-brand-neutral-600">
                    {t(`opportunities.${key}Organization`)} ·{" "}
                    {t(`opportunities.${key}Desc`)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-brand-neutral-600 sm:flex-col sm:items-end sm:gap-1">
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={14} aria-hidden="true" />
                    {t(`opportunities.${key}Location`)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} aria-hidden="true" />
                    {t("opportunities.closes")} {t(`opportunities.${key}Deadline`)}
                  </span>
                </div>

                <ArrowRight
                  size={18}
                  className="hidden text-brand-neutral-400 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 sm:block"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}