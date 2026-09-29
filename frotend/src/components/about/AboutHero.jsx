import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1611348586804-61bf6c080437?q=80&w=2070&auto=format&fit=crop";

export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-green-900/65 via-brand-green-800/55 to-brand-green-900/65"
      />

      <div className="gcx-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl px-4 pt-12 pb-24 text-center sm:px-6 sm:pt-14 sm:pb-28 lg:pt-16 lg:pb-32"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
            <Sparkles size={14} aria-hidden="true" />
            {t("about.heroEyebrow")}
          </span>

          <h1 className="mt-6 text-balance text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("about.heroHeading1")}{" "}
            <span className="text-brand-gold-400">
              {t("about.heroHeadingAccent")}
            </span>
            {t("about.heroHeading2")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 text-pretty">
            {t("about.heroSubhead")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/opportunities"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-brand-green-700 shadow-sm transition-all hover:bg-brand-green-50 hover:shadow-md"
            >
              {t("about.heroPrimaryCta")}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              {t("about.heroSecondaryCta")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}