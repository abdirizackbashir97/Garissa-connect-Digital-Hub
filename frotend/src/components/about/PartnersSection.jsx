import { useTranslation } from "react-i18next";

const PARTNERS = [
  { key: "partner1", placeholder: "GC" },
  { key: "partner2", placeholder: "TH" },
  { key: "partner3", placeholder: "CO" },
  { key: "partner4", placeholder: "YN" },
  { key: "partner5", placeholder: "BC" },
];

export default function PartnersSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-neutral-50">
      <div className="gcx-container gcx-section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
            {t("about.partnersEyebrow")}
          </span>
          <h2 className="mt-3">{t("about.partnersHeading")}</h2>
          <p className="mt-4 text-brand-neutral-600 text-pretty">
            {t("about.partnersSubhead")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {PARTNERS.map((partner) => (
            <div
              key={partner.key}
              className="flex flex-col items-center justify-center rounded-xl border border-brand-neutral-200 bg-white px-4 py-8 grayscale transition-all hover:grayscale-0"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-neutral-100 text-base font-bold text-brand-neutral-400">
                {partner.placeholder}
              </span>
              <p className="mt-3 text-center text-xs font-medium text-brand-neutral-600">
                {t(`about.${partner.key}`)}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-brand-neutral-400">
          {t("about.partnersMore")}
        </p>
      </div>
    </section>
  );
}