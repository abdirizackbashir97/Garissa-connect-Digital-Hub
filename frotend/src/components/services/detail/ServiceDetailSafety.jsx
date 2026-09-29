// Trust & Safety section with four signals + a report link.

import { useTranslation } from "react-i18next";
import { ShieldCheck, Lock, Users, Flag } from "lucide-react";

const POINTS = [
  { key: "safetyPoint1", icon: ShieldCheck },
  { key: "safetyPoint2", icon: Lock },
  { key: "safetyPoint3", icon: Users },
  { key: "safetyPoint4", icon: Flag },
];

export default function ServiceDetailSafety() {
  const { t } = useTranslation();

  return (
    <section id="safety" className="scroll-mt-32">
      <div className="overflow-hidden rounded-2xl border border-brand-neutral-200 bg-white">
        <div className="grid lg:grid-cols-12">
          {/* Left — heading */}
          <div className="border-b border-brand-neutral-100 p-5 sm:p-6 lg:col-span-4 lg:border-b-0 lg:border-e lg:p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {t("serviceDetailPage.safetyEyebrow", {
                defaultValue: "Trust & Safety",
              })}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-brand-neutral-900 sm:text-xl">
              {t("serviceDetailPage.safetyHeading", {
                defaultValue: "Your safety matters",
              })}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-neutral-600">
              {t("serviceDetailPage.safetySubhead", {
                defaultValue:
                  "Every provider on GarissaConnect is treated with the same standards of trust and accountability.",
              })}
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-brand-neutral-600 underline-offset-4 hover:text-brand-green-700 hover:underline sm:text-sm"
            >
              <Flag size={14} aria-hidden="true" />
              {t("serviceDetailPage.safetyReportCta", {
                defaultValue: "Report this listing",
              })}
            </button>
          </div>

          {/* Right — points */}
          <ul className="grid gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:col-span-8 lg:p-8">
            {POINTS.map(({ key, icon: Icon }) => (
              <li key={key} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-700">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-brand-neutral-900">
                    {t(`serviceDetailPage.${key}Title`)}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-brand-neutral-600 sm:text-sm">
                    {t(`serviceDetailPage.${key}Desc`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
