// Thin credibility strip shown right under the hero.

import { useTranslation } from "react-i18next";
import { ShieldCheck, Clock, MapPin, Award } from "lucide-react";

export default function ServiceDetailTrustStrip() {
  const { t } = useTranslation();

  const ITEMS = [
    {
      icon: ShieldCheck,
      label: t("serviceDetailPage.trust1", {
        defaultValue: "Verified provider",
      }),
    },
    {
      icon: Clock,
      label: t("serviceDetailPage.trust2", {
        defaultValue: "Responds within 24h",
      }),
    },
    {
      icon: MapPin,
      label: t("serviceDetailPage.trust3", {
        defaultValue: "Serves Garissa County",
      }),
    },
    {
      icon: Award,
      label: t("serviceDetailPage.trust4", {
        defaultValue: "Community rated",
      }),
    },
  ];

  return (
    <section className="border-b border-brand-neutral-200 bg-white">
      <div className="gcx-container">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3 py-5 sm:grid-cols-4 sm:py-6">
          {ITEMS.map(({ icon: Icon, label }, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-xs text-brand-neutral-700 sm:text-sm"
            >
              <Icon
                size={16}
                className="shrink-0 text-brand-green-600"
                aria-hidden="true"
              />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
