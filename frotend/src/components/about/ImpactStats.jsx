import { useTranslation } from "react-i18next";
import { Users, Briefcase, Store, CalendarDays } from "lucide-react";

const STATS = [
  { key: "impactResidents",     value: "500+", icon: Users },
  { key: "impactOpportunities", value: "120+", icon: Briefcase },
  { key: "impactBusinesses",    value: "80+",  icon: Store },
  { key: "impactEvents",        value: "50+",  icon: CalendarDays },
];

export default function ImpactStats() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-green-700 text-white">
      <div className="gcx-container gcx-section-sm">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-white">{t("about.impactHeading")}</h2>
          <p className="mt-3 text-brand-green-100">
            {t("about.impactSubhead")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.key} className="text-center">
                <Icon
                  size={22}
                  className="mx-auto text-brand-gold-400"
                  aria-hidden="true"
                />
                <p className="mt-3 text-3xl font-semibold sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-brand-green-100">
                  {t(`about.${stat.key}`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}