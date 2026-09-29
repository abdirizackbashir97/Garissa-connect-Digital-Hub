// "How it works" — four numbered steps with a connecting line.

import { useTranslation } from "react-i18next";
import { PhoneCall, FileText, CalendarCheck, ThumbsUp } from "lucide-react";

const STEPS = [
  { key: "step1", icon: PhoneCall },
  { key: "step2", icon: FileText },
  { key: "step3", icon: CalendarCheck },
  { key: "step4", icon: ThumbsUp },
];

export default function ServiceDetailProcess() {
  const { t } = useTranslation();

  return (
    <section id="process" className="scroll-mt-32">
      <div className="rounded-2xl border border-brand-neutral-200 bg-white p-5 sm:p-6 lg:p-8">
        <header>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
            {t("serviceDetailPage.processEyebrow", {
              defaultValue: "How it works",
            })}
          </span>
          <h2 className="mt-2 text-lg font-semibold text-brand-neutral-900 sm:text-xl">
            {t("serviceDetailPage.processHeading", {
              defaultValue: "Booking this service is easy",
            })}
          </h2>
        </header>

        <ol className="relative mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ key, icon: Icon }, i) => (
            <li key={key} className="relative">
              {/* Connecting line (desktop only) */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-6 -end-3 hidden h-px w-6 bg-brand-neutral-200 lg:block"
                />
              )}

              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="text-3xl font-semibold tracking-tight text-brand-neutral-300">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-4 text-sm font-semibold text-brand-neutral-900 sm:text-base">
                {t(`serviceDetailPage.process${key}Title`)}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-neutral-600 sm:text-sm">
                {t(`serviceDetailPage.process${key}Desc`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
