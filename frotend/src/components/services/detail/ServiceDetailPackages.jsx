// Three-tier pricing packages. Adds "real product" feel to a service page.
// Every tier's CTA is a phone call — the tier's request behaviour is
// identical for now; the backend can differentiate later.

import { useTranslation } from "react-i18next";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const TIERS = [
  {
    id: "basic",
    titleKey: "pkgBasicTitle",
    titleFallback: "Basic",
    priceKey: "pkgBasicPrice",
    priceFallback: "From KES 1,500",
    descKey: "pkgBasicDesc",
    descFallback: "A solid starting point for individuals.",
    features: [
      { k: "pkgBasicF1", d: "Initial consultation" },
      { k: "pkgBasicF2", d: "Standard delivery" },
      { k: "pkgBasicF3", d: "Email support" },
    ],
  },
  {
    id: "standard",
    titleKey: "pkgStandardTitle",
    titleFallback: "Standard",
    priceKey: "pkgStandardPrice",
    priceFallback: "From KES 3,500",
    descKey: "pkgStandardDesc",
    descFallback: "Best for families and small businesses.",
    popular: true,
    features: [
      { k: "pkgStandardF1", d: "Everything in Basic" },
      { k: "pkgStandardF2", d: "Priority scheduling" },
      { k: "pkgStandardF3", d: "Phone and WhatsApp support" },
      { k: "pkgStandardF4", d: "Follow-up visit" },
    ],
  },
  {
    id: "premium",
    titleKey: "pkgPremiumTitle",
    titleFallback: "Premium",
    priceKey: "pkgPremiumPrice",
    priceFallback: "Custom quote",
    descKey: "pkgPremiumDesc",
    descFallback: "Full-service care with dedicated support.",
    features: [
      { k: "pkgPremiumF1", d: "Everything in Standard" },
      { k: "pkgPremiumF2", d: "Same-day or next-day service" },
      { k: "pkgPremiumF3", d: "Dedicated account manager" },
      { k: "pkgPremiumF4", d: "Warranty on work" },
    ],
  },
];

export default function ServiceDetailPackages({ service }) {
  const { t } = useTranslation();

  return (
    <section id="packages" className="scroll-mt-32">
      <div className="rounded-2xl border border-brand-neutral-200 bg-white p-5 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {t("serviceDetailPage.packagesEyebrow", {
                defaultValue: "Choose a package",
              })}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-brand-neutral-900 sm:text-xl">
              {t("serviceDetailPage.packagesHeading", {
                defaultValue: "Service packages",
              })}
            </h2>
          </div>
          <p className="text-xs text-brand-neutral-500 sm:text-sm">
            {t("serviceDetailPage.packagesNote", {
              defaultValue:
                "Prices are indicative. Contact for a written quote.",
            })}
          </p>
        </header>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.id}
              className={`relative flex flex-col rounded-xl border p-5 transition ${
                tier.popular
                  ? "border-brand-green-500 bg-brand-green-50/50 shadow-sm"
                  : "border-brand-neutral-200 bg-white hover:border-brand-green-300"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 start-5 inline-flex items-center gap-1 rounded-full bg-brand-gold-500 px-2.5 py-1 text-[10px] font-semibold text-brand-green-900 shadow">
                  <Sparkles size={11} aria-hidden="true" />
                  {t("serviceDetailPage.packagePopular", {
                    defaultValue: "Most popular",
                  })}
                </span>
              )}

              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-neutral-500">
                {t(`serviceDetailPage.${tier.titleKey}`, {
                  defaultValue: tier.titleFallback,
                })}
              </h3>
              <p className="mt-2 text-2xl font-semibold text-brand-neutral-900">
                {t(`serviceDetailPage.${tier.priceKey}`, {
                  defaultValue: tier.priceFallback,
                })}
              </p>
              <p className="mt-1 text-xs text-brand-neutral-500">
                {t(`serviceDetailPage.${tier.descKey}`, {
                  defaultValue: tier.descFallback,
                })}
              </p>

              <ul className="mt-5 space-y-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f.k}
                    className="flex items-start gap-2 text-sm text-brand-neutral-700"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                      <Check size={11} aria-hidden="true" />
                    </span>
                    {t(`serviceDetailPage.${f.k}`, { defaultValue: f.d })}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                {service.phone ? (
                  <a
                    href={`tel:${service.phone}`}
                    className={`inline-flex w-full items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                      tier.popular
                        ? "bg-brand-green-600 text-white hover:bg-brand-green-700"
                        : "border border-brand-neutral-200 bg-white text-brand-neutral-800 hover:bg-brand-neutral-50"
                    }`}
                  >
                    {t("serviceDetailPage.packageCta", {
                      defaultValue: "Request this",
                    })}
                    <ArrowRight
                      size={14}
                      className="rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <span className="inline-flex w-full items-center justify-center rounded-md border border-brand-neutral-200 px-4 py-2.5 text-sm font-medium text-brand-neutral-500">
                    {t("serviceDetailPage.packageCta", {
                      defaultValue: "Request this",
                    })}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
