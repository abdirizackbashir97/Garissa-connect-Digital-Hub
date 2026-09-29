import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Briefcase,
  Store,
  CalendarDays,
  Globe,
  Users,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { key: "opportunities", path: "/opportunities", icon: Briefcase },
  { key: "businesses",    path: "/businesses",    icon: Store },
  { key: "events",        path: "/events",        icon: CalendarDays },
  { key: "services",      path: "/services",      icon: Globe },
  { key: "community",     path: "/community",     icon: Users },
  { key: "resources",     path: "/resources",     icon: BookOpen },
];

export default function QuickAccessSection() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2>{t("quickAccess.heading")}</h2>
          <p className="mt-3 text-brand-neutral-600">
            {t("quickAccess.subhead")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <Link
                  to={item.path}
                  className="group flex h-full items-start gap-4 rounded-lg border border-brand-neutral-200 bg-white p-5 transition-all hover:border-brand-green-500 hover:shadow-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-green-50 text-brand-green-600 transition-colors group-hover:bg-brand-green-500 group-hover:text-white">
                    <Icon size={20} aria-hidden="true" />
                  </span>

                  <span className="flex-1">
                    <span className="block text-base font-semibold text-brand-neutral-900">
                      {t(`quickAccess.${item.key}.title`)}
                    </span>
                    <span className="mt-1 block text-sm text-brand-neutral-600">
                      {t(`quickAccess.${item.key}.desc`)}
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}