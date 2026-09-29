import { useTranslation } from "react-i18next";
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article className="rounded-2xl border border-brand-neutral-200 bg-white p-8 lg:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-green-50 text-brand-green-700">
              <Target size={20} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl">
              {t("about.missionTitle")}
            </h2>
            <p className="mt-4 text-brand-neutral-600 text-pretty">
              {t("about.missionText")}
            </p>
          </article>

          <article className="rounded-2xl border border-brand-neutral-200 bg-white p-8 lg:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-gold-100 text-brand-gold-600">
              <Eye size={20} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl">
              {t("about.visionTitle")}
            </h2>
            <p className="mt-4 text-brand-neutral-600 text-pretty">
              {t("about.visionText")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}