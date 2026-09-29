import { useTranslation } from "react-i18next";
import { Briefcase, Store, CalendarDays, BookOpen } from "lucide-react";

const PILLARS = [
  { key: "pillar1", icon: Briefcase },
  { key: "pillar2", icon: Store },
  { key: "pillar3", icon: CalendarDays },
  { key: "pillar4", icon: BookOpen },
];

export default function WhatWeDo() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
            {t("about.whatWeDoEyebrow")}
          </span>
          <h2 className="mt-3">{t("about.whatWeDoHeading")}</h2>
          <p className="mt-4 text-brand-neutral-600 text-pretty">
            {t("about.whatWeDoSubhead")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.key}
                className="rounded-xl border border-brand-neutral-200 bg-white p-6 transition-colors hover:border-brand-green-500"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-green-50 text-brand-green-700">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg">
                  {t(`about.${pillar.key}Title`)}
                </h3>
                <p className="mt-2 text-sm text-brand-neutral-600">
                  {t(`about.${pillar.key}Desc`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}