import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  const { t } = useTranslation();

  return (
    <section className="gcx-container gcx-section-sm">
      <div className="relative overflow-hidden rounded-2xl bg-brand-green-700 px-6 py-14 text-white sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-brand-gold-500/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-white text-balance">{t("cta.heading")}</h2>
          <p className="mt-5 text-brand-green-100 text-pretty">
            {t("cta.subhead")}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-brand-green-700 transition-colors hover:bg-brand-green-50"
            >
              {t("cta.createAccount")}
              <ArrowRight
                size={18}
                className="rtl:rotate-180"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/opportunities"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              {t("cta.exploreOpportunities")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}