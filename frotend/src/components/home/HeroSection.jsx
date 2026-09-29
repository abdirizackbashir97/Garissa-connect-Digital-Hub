import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import heroImage from "../../assets/hero.png";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-green-50),transparent_60%)]"
      />

      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ---------- LEFT: text ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="order-2 lg:order-1 lg:col-span-7"
        >
          <div className="gcx-container lg:py-28 lg:pe-0 lg:ps-8 xl:ps-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-green-100 bg-brand-green-50 px-3 py-1 text-xs font-medium tracking-wide text-brand-green-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-green-600" />
              </span>
              {t("hero.eyebrow")}
            </span>

            <h1 className="mt-6 text-balance text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.headline1")}
              <br />
              {t("hero.headline2")}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-brand-green-700">
                  {t("hero.headlineAccent")}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 start-0 h-3 w-full text-brand-gold-400"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 60 2, 140 2, 198 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg text-brand-neutral-600 text-pretty">
              {t("hero.subhead")}
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Link
                to="/opportunities"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-green-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-brand-green-700 hover:shadow-md"
              >
                {t("hero.primaryCta")}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 text-base font-medium text-brand-neutral-800 hover:text-brand-green-700"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-brand-neutral-200 pt-6">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-brand-green-600" aria-hidden="true" />
                <span className="text-sm text-brand-neutral-600">
                  <strong className="font-semibold text-brand-neutral-900">500+</strong>{" "}
                  {t("hero.statResidents")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-brand-green-600" aria-hidden="true" />
                <span className="text-sm text-brand-neutral-600">
                  <strong className="font-semibold text-brand-neutral-900">120+</strong>{" "}
                  {t("hero.statOpportunities")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---------- RIGHT: image ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative order-1 lg:order-2 lg:col-span-5"
        >
          <div className="relative h-full min-h-[320px] w-full sm:min-h-[420px] lg:min-h-[560px]">
            <img
              src={heroImage}
              alt="Garissa community members connecting through GarissaConnect"
              className="h-full w-full object-cover"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 start-0 hidden w-40 bg-gradient-to-r from-white to-transparent rtl:bg-gradient-to-l lg:block"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/25 to-transparent lg:hidden"
            />

            <div className="absolute start-6 top-6 hidden rounded-xl bg-white/95 p-3 shadow-lg ring-1 ring-brand-neutral-200/60 backdrop-blur-sm sm:block lg:start-8 lg:top-8">
              <p className="text-[10px] font-medium uppercase tracking-wider text-brand-neutral-400">
                {t("hero.liveNowLabel")}
              </p>
              <p className="mt-0.5 text-2xl font-semibold leading-none text-brand-green-700">
                {t("hero.liveNowCount")}
              </p>
              <p className="mt-1 text-xs text-brand-neutral-600">
                {t("hero.liveNowDesc")}
              </p>
            </div>

            <div className="absolute bottom-6 start-6 hidden w-56 rounded-xl bg-white/95 p-4 shadow-xl ring-1 ring-brand-neutral-200/60 backdrop-blur-sm sm:block lg:bottom-8 lg:start-8">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green-100 text-sm font-semibold text-brand-green-700">
                  A
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-brand-neutral-900">
                    {t("hero.testimonialName")}
                  </p>
                  <p className="text-[10px] text-brand-neutral-400">
                    {t("hero.testimonialRole")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}