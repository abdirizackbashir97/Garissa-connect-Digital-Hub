// Sticky contact panel + availability + languages + trust + actions.

import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Languages,
  CalendarCheck,
} from "lucide-react";

export default function ServiceDetailSidebar({ service }) {
  const { t } = useTranslation();
  const hasAny = service.phone || service.email || service.location;
  const isVerified = service.is_verified === 1;

  return (
    <div className="space-y-4">
      {/* Contact + primary CTA */}
      <div className="rounded-2xl border border-brand-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-semibold text-brand-neutral-900 sm:text-lg">
          {t("serviceDetailPage.contactHeading")}
        </h2>
        <div className="mt-3 h-px bg-brand-neutral-100" />

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-green-50 px-3 py-1 text-xs font-medium text-brand-green-700">
          <span className="h-2 w-2 rounded-full bg-brand-green-500" />
          {t("serviceDetailPage.openNow")}
        </div>

        {/* Hours */}
        <div className="mt-4 flex items-start gap-3 text-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-700">
            <Clock size={15} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-brand-neutral-400">
              {t("serviceDetailPage.hoursLabel")}
            </p>
            <p className="text-brand-neutral-800">
              {t("serviceDetailPage.hoursValue")}
            </p>
          </div>
        </div>

        {/* Languages */}
        <div className="mt-3 flex items-start gap-3 text-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-700">
            <Languages size={15} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-brand-neutral-400">
              {t("serviceDetailPage.languagesLabel", {
                defaultValue: "Languages",
              })}
            </p>
            <p className="text-brand-neutral-800">
              {t("serviceDetailPage.languagesValue", {
                defaultValue: "Somali · Kiswahili · English",
              })}
            </p>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-3 flex items-start gap-3 text-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-700">
            <CalendarCheck size={15} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-brand-neutral-400">
              {t("serviceDetailPage.availabilityLabel", {
                defaultValue: "Availability",
              })}
            </p>
            <p className="text-brand-neutral-800">
              {t("serviceDetailPage.availabilityValue", {
                defaultValue: "Mon – Sat",
              })}
            </p>
          </div>
        </div>

        {/* Contact fields */}
        {hasAny ? (
          <ul className="mt-5 space-y-3 border-t border-brand-neutral-100 pt-5 text-sm">
            {service.location && (
              <li className="flex items-start gap-3">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-brand-green-600"
                  aria-hidden="true"
                />
                <span className="break-words text-brand-neutral-800">
                  {service.location}
                </span>
              </li>
            )}
            {service.phone && (
              <li className="flex items-start gap-3">
                <Phone
                  size={15}
                  className="mt-0.5 shrink-0 text-brand-green-600"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${service.phone}`}
                  className="break-all font-medium text-brand-green-700 hover:text-brand-green-600"
                >
                  {service.phone}
                </a>
              </li>
            )}
            {service.email && (
              <li className="flex items-start gap-3">
                <Mail
                  size={15}
                  className="mt-0.5 shrink-0 text-brand-green-600"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${service.email}`}
                  className="break-all font-medium text-brand-green-700 hover:text-brand-green-600"
                >
                  {service.email}
                </a>
              </li>
            )}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-brand-neutral-500">
            {t("serviceDetailPage.noContact")}
          </p>
        )}

        {/* CTAs */}
        {service.phone && (
          <a
            href={`tel:${service.phone}`}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-700"
          >
            <Phone size={15} aria-hidden="true" />
            {t("serviceDetailPage.callNow")}
          </a>
        )}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-brand-neutral-200 bg-white px-3 py-2.5 text-xs font-medium text-brand-neutral-700 transition hover:bg-brand-neutral-50 sm:text-sm"
          >
            <MessageCircle size={14} aria-hidden="true" />
            {t("serviceDetailPage.messageLabel")}
          </button>
          {service.email && (
            <a
              href={`mailto:${service.email}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-brand-neutral-200 bg-white px-3 py-2.5 text-xs font-medium text-brand-neutral-700 transition hover:bg-brand-neutral-50 sm:text-sm"
            >
              <Mail size={14} aria-hidden="true" />
              {t("serviceDetailPage.emailLabel")}
            </a>
          )}
        </div>
      </div>

      {/* Trust panel */}
      <div className="rounded-2xl border border-brand-green-100 bg-brand-green-50/60 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-green-700">
            <ShieldCheck size={16} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-brand-green-900">
              {t("serviceDetailPage.trustLabel")}
            </p>
            <p className="mt-1 text-xs text-brand-green-900/80">
              {isVerified
                ? t("serviceDetailPage.trustVerified")
                : t("serviceDetailPage.trustUnverified")}
            </p>
            <p className="mt-2 text-[11px] text-brand-green-900/60">
              {t("serviceDetailPage.memberSince")}:{" "}
              {t("serviceDetailPage.memberSinceValue")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
