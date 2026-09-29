import { useTranslation } from "react-i18next";
import { Search, MapPin, Phone, BadgeCheck, ArrowRight } from "lucide-react";

const QUICK_TAGS = ["Computer Repair", "Pharmacy", "Restaurant", "Taxi"];

// Preview shows 3 known demo services (IDs 1, 5, 9 in the seed data).
// Their names and categories come from translation keys — not hardcoded.
const PREVIEW_SERVICES = [
  { icon: "💻", id: 1, verified: true },
  { icon: "🏥", id: 5, verified: true },
  { icon: "🍽️", id: 9, verified: false },
];

export default function ServicesHero({ search, onSearchChange }) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-green-800 via-brand-green-700 to-brand-green-800">
      {/* Decorative grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -end-40 h-[32rem] w-[32rem] rounded-full bg-brand-gold-500/15 blur-3xl"
      />

      <div className="gcx-container relative">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">

          {/* =================== LEFT: content =================== */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-gold-400" />
              </span>
              {t("servicesPage.heroEyebrow")}
            </span>

            {/* Headline */}
            <h1 className="mt-6 text-balance text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {t("servicesPage.heroHeadline1")}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-brand-gold-400">
                  {t("servicesPage.heroHeadlineAccent")}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 start-0 h-3 w-full text-brand-gold-400/60"
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
              </span>{" "}
              {t("servicesPage.heroHeadline2")}
            </h1>

            {/* Subhead */}
            <p className="mt-6 max-w-xl text-base text-white/75 text-pretty sm:text-lg">
              {t("servicesPage.heroSubhead")}
            </p>

            {/* Search */}
            <div className="mt-8 max-w-xl">
              <label htmlFor="services-search" className="sr-only">
                {t("servicesPage.heroPlaceholder")}
              </label>
              <div className="group relative">
                <Search
                  size={20}
                  className="pointer-events-none absolute top-1/2 start-5 -translate-y-1/2 text-brand-neutral-400 transition-colors group-focus-within:text-brand-green-600"
                  aria-hidden="true"
                />
                <input
                  id="services-search"
                  type="search"
                  value={search}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder={t("servicesPage.heroPlaceholder")}
                  className="w-full rounded-full border border-white/20 bg-white py-4 ps-14 pe-4 text-base text-brand-neutral-900 placeholder-brand-neutral-400 shadow-2xl shadow-black/20 outline-none transition focus:ring-4 focus:ring-brand-gold-400/30"
                />
              </div>

              {/* Quick tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                  {t("servicesPage.heroPopular")}
                </span>
                {QUICK_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onSearchChange?.(tag)}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dd className="text-2xl font-semibold text-white">24+</dd>
                <dt className="mt-0.5 text-xs text-white/55">
                  {t("servicesPage.heroStatsServices")}
                </dt>
              </div>
              <div>
                <dd className="text-2xl font-semibold text-white">12</dd>
                <dt className="mt-0.5 text-xs text-white/55">
                  {t("servicesPage.heroStatsCategories")}
                </dt>
              </div>
              <div>
                <dd className="text-2xl font-semibold text-white">100%</dd>
                <dt className="mt-0.5 text-xs text-white/55">
                  {t("servicesPage.heroStatsLocal")}
                </dt>
              </div>
            </dl>
          </div>

          {/* =================== RIGHT: preview panel =================== */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="relative">
              {/* Rotated background accent */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rotate-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
              />

              {/* Preview card stack */}
              <div className="relative rounded-2xl bg-white p-6 shadow-2xl shadow-black/30 ring-1 ring-black/5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-brand-neutral-100 pb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-brand-neutral-400">
                      {t("servicesPage.heroPreviewLabel")}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-brand-neutral-900">
                      {t("servicesPage.heroPreviewTitle")}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-50 px-2.5 py-1 text-xs font-medium text-brand-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green-500" />
                    24 {t("servicesPage.heroPreviewLive")}
                  </span>
                </div>

                {/* Service preview rows */}
                <ul className="divide-y divide-brand-neutral-100">
                  {PREVIEW_SERVICES.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-start gap-4 py-4 first:pt-5 last:pb-0"
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-xl"
                        aria-hidden="true"
                      >
                        {s.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-brand-neutral-900">
                            {t(`servicesCatalog.svc${s.id}Name`, {
                              defaultValue: t("servicesPage.heroPreviewTitle"),
                            })}
                          </p>
                          {s.verified && (
                            <BadgeCheck
                              size={14}
                              className="shrink-0 text-brand-green-600"
                              aria-label={t("servicesPage.cardVerified")}
                            />
                          )}
                        </div>
                        <p className="mt-0.5 truncate text-xs text-brand-neutral-500">
                          {t(`servicesCatalog.svc${s.id}Category`, {
                            defaultValue: "",
                          })}
                        </p>
                        <div className="mt-1.5 flex items-center gap-3 text-[11px] text-brand-neutral-400">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={11} aria-hidden="true" />
                            Garissa Town
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Phone size={11} aria-hidden="true" />
                            {t("servicesPage.heroPreviewAvailable")}
                          </span>
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="mt-3 shrink-0 text-brand-neutral-300 rtl:rotate-180"
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>

                {/* Footer link */}
                <div className="mt-5 border-t border-brand-neutral-100 pt-4 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-green-700">
                    {t("servicesPage.heroPreviewSeeAll")}
                    <ArrowRight
                      size={12}
                      className="rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>

              {/* Floating accent badge */}
              <div className="absolute -bottom-4 -start-4 hidden rounded-xl bg-brand-gold-500 px-4 py-3 shadow-xl shadow-black/20 sm:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-green-900/70">
                  {t("servicesPage.heroPreviewBadgeLabel")}
                </p>
                <p className="text-sm font-semibold text-brand-green-900">
                  {t("servicesPage.heroPreviewBadgeText")}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}