import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Users, Briefcase, Store, CalendarDays, BookOpen } from "lucide-react";

const STATS = [
  { key: "users",         value: "500+", icon: Users },
  { key: "opportunities", value: "120+", icon: Briefcase },
  { key: "businesses",    value: "80+",  icon: Store },
  { key: "events",        value: "50+",  icon: CalendarDays },
  { key: "resources",     value: "200+", icon: BookOpen },
];

export default function StatisticsSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-green-700 text-white">
      <div className="gcx-container gcx-section-sm">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-white">{t("statistics.heading")}</h2>
          <p className="mt-3 text-brand-green-100">
            {t("statistics.subhead")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="text-center"
              >
                <Icon
                  size={22}
                  className="mx-auto text-brand-gold-400"
                  aria-hidden="true"
                />
                <p className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-brand-green-100">
                  {t(`statistics.${stat.key}`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}