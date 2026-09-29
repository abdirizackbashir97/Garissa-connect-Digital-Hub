import { useTranslation } from "react-i18next";

const VALUE_KEYS = ["value1", "value2", "value3", "value4", "value5"];

export default function OurValues() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-neutral-50">
      <div className="gcx-container gcx-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {t("about.valuesEyebrow")}
            </span>
            <h2 className="mt-3">{t("about.valuesHeading")}</h2>
            <p className="mt-5 text-brand-neutral-600 text-pretty">
              {t("about.valuesSubhead")}
            </p>
          </div>

          <ul className="lg:col-span-7">
            {VALUE_KEYS.map((key, i) => (
              <li
                key={key}
                className={`flex gap-5 py-6 ${
                  i !== VALUE_KEYS.length - 1
                    ? "border-b border-brand-neutral-200"
                    : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-brand-green-700 ring-1 ring-brand-neutral-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-brand-neutral-900">
                    {t(`about.${key}Title`)}
                  </h3>
                  <p className="mt-1 text-sm text-brand-neutral-600">
                    {t(`about.${key}Desc`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}