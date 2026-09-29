import { useTranslation } from "react-i18next";

const STEPS = [
  { number: "01", key: "step1" },
  { number: "02", key: "step2" },
  { number: "03", key: "step3" },
  { number: "04", key: "step4" },
];

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-neutral-50">
      <div className="gcx-container gcx-section">
        <div className="mx-auto max-w-2xl text-center">
          <h2>{t("howItWorks.heading")}</h2>
          <p className="mt-3 text-brand-neutral-600">
            {t("howItWorks.subhead")}
          </p>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.key} className="relative">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-semibold text-brand-green-600">
                  {step.number}
                </span>
                <span className="h-px flex-1 bg-brand-neutral-200" />
              </div>

              <h3 className="mt-4 text-xl">
                {t(`howItWorks.${step.key}Title`)}
              </h3>

              <p className="mt-2 text-sm text-brand-neutral-600">
                {t(`howItWorks.${step.key}Desc`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}