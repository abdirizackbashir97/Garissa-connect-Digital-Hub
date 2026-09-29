import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

const POINT_KEYS = ["storyPoint1", "storyPoint2", "storyPoint3", "storyPoint4"];

export default function OurStory() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-neutral-50">
      <div className="gcx-container gcx-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {t("about.storyEyebrow")}
            </span>
            <h2 className="mt-3">{t("about.storyHeading")}</h2>

            <div className="mt-6 space-y-4 text-brand-neutral-600 text-pretty">
              <p>{t("about.storyPara1")}</p>
              <p>{t("about.storyPara2")}</p>
              <p>{t("about.storyPara3")}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-brand-neutral-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-brand-neutral-900">
                {t("about.storyPointsHeading")}
              </h3>
              <ul className="mt-5 space-y-4">
                {POINT_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    <span className="text-sm text-brand-neutral-700">
                      {t(`about.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}