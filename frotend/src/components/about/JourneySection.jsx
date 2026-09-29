import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Lightbulb, Code2, Rocket, Users, TrendingUp } from "lucide-react";

const MILESTONES = [
  { key: "M1", year: "2024", icon: Lightbulb, accent: "gold" },
  { key: "M2", year: "2024", icon: Code2,     accent: "green" },
  { key: "M3", year: "2025", icon: Rocket,    accent: "green" },
  { key: "M4", year: "2025", icon: Users,     accent: "green" },
  { key: "M5", year: "Today", icon: TrendingUp, accent: "gold" },
];

export default function JourneySection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-brand-neutral-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,var(--color-brand-green-50),transparent_70%)]"
      />

      <div className="gcx-container gcx-section relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-green-100 bg-white px-3 py-1 text-xs font-medium tracking-wide text-brand-green-700">
            {t("about.journeyEyebrow")}
          </span>
          <h2 className="mt-4">{t("about.journeyHeading")}</h2>
          <p className="mt-4 text-brand-neutral-600 text-pretty">
            {t("about.journeySubhead")}
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-green-200 to-transparent lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-green-200 to-transparent sm:left-8 lg:hidden"
          />

          <ol className="space-y-12 lg:space-y-0">
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              const isGold = m.accent === "gold";
              const isLeft = i % 2 === 0;

              return (
                <motion.li
                  key={m.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-6"
                >
                  <div
                    className={`hidden lg:block ${
                      isLeft ? "lg:pe-16 lg:text-end" : "lg:col-start-2 lg:ps-16"
                    }`}
                  >
                    <TimelineCard
                      title={t(`about.journey${m.key}Title`)}
                      desc={t(`about.journey${m.key}Desc`)}
                      Icon={Icon}
                      isGold={isGold}
                      align={isLeft ? "right" : "left"}
                    />
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                  >
                    <SpineNode year={m.year} isGold={isGold} />
                  </div>

                  <div className="flex gap-5 sm:gap-6 lg:hidden">
                    <div className="relative flex flex-col items-center">
                      <SpineNode year={m.year} isGold={isGold} small />
                    </div>
                    <div className="flex-1 pt-1">
                      <TimelineCard
                        title={t(`about.journey${m.key}Title`)}
                        desc={t(`about.journey${m.key}Desc`)}
                        Icon={Icon}
                        isGold={isGold}
                        align="left"
                      />
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SpineNode({ year, isGold, small = false }) {
  const size = small ? "h-14 w-14 text-[11px]" : "h-16 w-16 text-xs";

  return (
    <span
      className={`relative z-10 flex ${size} items-center justify-center rounded-full font-bold tracking-wide ring-4 ring-brand-neutral-50 ${
        isGold
          ? "bg-gradient-to-br from-brand-gold-100 to-brand-gold-100/60 text-brand-gold-600"
          : "bg-gradient-to-br from-brand-green-50 to-white text-brand-green-700"
      }`}
    >
      {year}
    </span>
  );
}

function TimelineCard({ title, desc, Icon, isGold, align }) {
  return (
    <article
      className={`group relative rounded-2xl border border-brand-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green-300 hover:shadow-lg sm:p-7`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-6 top-0 h-px ${
          isGold
            ? "bg-gradient-to-r from-transparent via-brand-gold-400/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-brand-green-300/60 to-transparent"
        }`}
      />

      <div
        className={`flex items-center gap-3 ${
          align === "right" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            isGold
              ? "bg-brand-gold-100 text-brand-gold-600"
              : "bg-brand-green-50 text-brand-green-700"
          }`}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-brand-neutral-900">{title}</h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-brand-neutral-600 text-pretty">
        {desc}
      </p>
    </article>
  );
}