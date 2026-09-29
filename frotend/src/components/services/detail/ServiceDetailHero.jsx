// Cinematic service detail hero.
// Bigger image, floating stat card, tight typography, layered CTAs.

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  ChevronRight,
  BadgeCheck,
  Building2,
  Star,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  Clock,
  MapPin,
} from "lucide-react";
import { categoryImages } from "../../../utils/categoryImages";

export default function ServiceDetailHero({ service, name, catName, catKey }) {
  const { t } = useTranslation();
  const isVerified = service.is_verified === 1;
  const heroImage =
    service.image || (categoryImages(catKey) && categoryImages(catKey)[0]);
  const ratingAvg = 4.6;
  const ratingCount = 24;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[30rem] w-full sm:h-[34rem] lg:h-[40rem]">
        {heroImage ? (
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-green-900" />
        )}

        {/* Dark gradient for text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-green-900 via-brand-green-900/70 to-brand-green-900/25"
        />
        {/* Warm radial highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -end-40 h-[36rem] w-[36rem] rounded-full bg-brand-gold-500/15 blur-3xl"
        />

        <div className="gcx-container relative h-full">
          <div className="flex h-full flex-col">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="pt-5 text-xs text-white/80 sm:pt-6 sm:text-sm"
            >
              <ol className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                <li>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    <Home size={12} aria-hidden="true" />
                    <span className="hidden sm:inline">
                      {t("serviceDetailPage.breadcrumbHome")}
                    </span>
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight
                    size={12}
                    className="text-white/50 rtl:rotate-180"
                  />
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    {t("serviceDetailPage.breadcrumbServices")}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight
                    size={12}
                    className="text-white/50 rtl:rotate-180"
                  />
                </li>
                <li className="min-w-0 max-w-[12rem] truncate sm:max-w-none">
                  <span className="font-medium text-white">{name}</span>
                </li>
              </ol>
            </nav>

            <div className="flex-1" aria-hidden="true" />

            {/* Bottom content */}
            <div className="pb-8 sm:pb-10 lg:pb-12">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm sm:px-3 sm:text-xs">
                  <span aria-hidden="true">{service.category_icon || "•"}</span>
                  <span className="truncate">{catName}</span>
                </span>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold-500 px-2.5 py-1 text-[11px] font-semibold text-brand-green-900 sm:px-3 sm:text-xs">
                    <BadgeCheck size={12} aria-hidden="true" />
                    {t("servicesPage.cardVerified")}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                {name}
              </h1>

              {/* Provider + rating row */}
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                {service.provider_name && (
                  <span className="inline-flex items-center gap-2 text-sm text-white/90">
                    <Building2 size={15} aria-hidden="true" />
                    <span className="truncate">{service.provider_name}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-2 text-sm text-white/85">
                  <span className="inline-flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={14}
                        className={
                          n <= Math.round(ratingAvg)
                            ? "fill-brand-gold-400 text-brand-gold-400"
                            : "text-white/40"
                        }
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  <span>
                    <strong className="font-semibold text-white">
                      {ratingAvg.toFixed(1)}
                    </strong>{" "}
                    · {ratingCount} {t("serviceDetailPage.reviewsCountLabel")}
                  </span>
                </span>
              </div>

              {/* Primary CTAs */}
              <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                {service.phone && (
                  <a
                    href={`tel:${service.phone}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-green-700 shadow-md transition hover:bg-brand-green-50 sm:px-6"
                  >
                    <Phone size={16} aria-hidden="true" />
                    {t("serviceDetailPage.callNow")}
                  </a>
                )}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-6"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  {t("serviceDetailPage.messageLabel")}
                </button>
                <span className="ms-auto hidden gap-2 sm:flex">
                  <button
                    type="button"
                    aria-label={t("serviceDetailPage.shareLabel")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/15"
                  >
                    <Share2 size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={t("serviceDetailPage.saveLabel")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/15"
                  >
                    <Heart size={16} aria-hidden="true" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating stat card (desktop) */}
        <div className="pointer-events-none absolute bottom-8 end-6 hidden w-64 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md lg:block">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/70">
            {t("serviceDetailPage.quickFacts", { defaultValue: "Quick facts" })}
          </p>
          <ul className="mt-3 space-y-2.5 text-xs text-white">
            <li className="flex items-center gap-2">
              <Clock size={13} aria-hidden="true" />
              <span>
                {t("serviceDetailPage.responseTime", {
                  defaultValue: "Response within 24h",
                })}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={13} aria-hidden="true" />
              <span>{service.location || "Garissa County"}</span>
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck size={13} aria-hidden="true" />
              <span>
                {t("serviceDetailPage.memberSince", { defaultValue: "Member since" })}{" "}
                {t("serviceDetailPage.memberSinceValue", { defaultValue: "2025" })}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
