import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Megaphone } from "lucide-react";

const UPDATE_KEYS = ["cu1", "cu2", "cu3"];

export default function CommunityUpdates() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2>{t("communityUpdates.heading")}</h2>
            <p className="mt-3 text-brand-neutral-600">
              {t("communityUpdates.subhead")}
            </p>
          </div>

          <Link
            to="/community"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-green-700 hover:text-brand-green-600"
          >
            {t("communityUpdates.viewAll")}
            <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {UPDATE_KEYS.map((key) => (
            <article
              key={key}
              className="flex flex-col border-t-2 border-brand-green-500 pt-5"
            >
              <div className="flex items-center gap-2 text-xs">
                <Megaphone
                  size={14}
                  className="text-brand-green-600"
                  aria-hidden="true"
                />
                <span className="font-medium uppercase tracking-wide text-brand-green-700">
                  {t(`communityUpdates.${key}Category`)}
                </span>
                <span className="text-brand-neutral-400">·</span>
                <span className="text-brand-neutral-400">
                  {t(`communityUpdates.${key}Date`)}
                </span>
              </div>

              <h3 className="mt-3 text-lg">
                {t(`communityUpdates.${key}Title`)}
              </h3>

              <p className="mt-3 flex-1 text-sm text-brand-neutral-600">
                {t(`communityUpdates.${key}Summary`)}
              </p>

              <Link
                to={`/community/${key}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-green-700 hover:text-brand-green-600"
              >
                {t("communityUpdates.readMore")}
                <ArrowRight size={14} className="rtl:rotate-180" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}