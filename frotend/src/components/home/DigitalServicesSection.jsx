import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check, ArrowRight } from "lucide-react";

const PANEL_IMAGE_URL =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop";

const POINT_KEYS = ["point1", "point2", "point3", "point4", "point5", "point6"];

export default function DigitalServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-neutral-50">
      <div className="gcx-container gcx-section">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* LEFT */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {t("digitalServices.eyebrow")}
            </span>
            <h2 className="mt-3">{t("digitalServices.heading")}</h2>
            <p className="mt-4 text-brand-neutral-600 text-pretty">
              {t("digitalServices.subhead")}
            </p>

            <ul className="mt-8 space-y-3">
              {POINT_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-green-700">
                    <Check size={12} aria-hidden="true" />
                  </span>
                  <span className="text-brand-neutral-800">
                    {t(`digitalServices.${key}`)}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-green-700 hover:text-brand-green-600"
            >
              {t("digitalServices.cta")}
              <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${PANEL_IMAGE_URL})` }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-brand-green-900/75 via-brand-green-800/60 to-brand-green-900/80"
              />

              <div className="relative flex h-full flex-col justify-between p-8 text-white sm:p-10">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-brand-green-100">
                    {t("digitalServices.availableLabel")}
                  </p>
                  <p className="mt-3 text-2xl font-semibold leading-snug sm:text-3xl">
                    {t("digitalServices.panelHeading")}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-semibold">
                      {t("digitalServices.stat247")}
                    </p>
                    <p className="mt-1 text-xs text-brand-green-100">
                      {t("digitalServices.stat247Label")}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-semibold">3</p>
                    <p className="mt-1 text-xs text-brand-green-100">
                      {t("digitalServices.stat3Label")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}