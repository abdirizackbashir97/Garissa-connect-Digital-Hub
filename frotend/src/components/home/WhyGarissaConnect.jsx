import { useTranslation } from "react-i18next";

const VALUE_KEYS = ["value1", "value2", "value3", "value4", "value5"];

export default function WhyGarissaConnect() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {t("why.eyebrow")}
            </span>
            <h2 className="mt-3">{t("why.heading")}</h2>
            <p className="mt-5 text-brand-neutral-600 text-pretty">
              {t("why.para1")}
            </p>
            <p className="mt-4 text-brand-neutral-600 text-pretty">
              {t("why.para2")}
            </p>
          </div>

          <ul className="lg:col-span-3 lg:pt-4">
            {VALUE_KEYS.map((key, i) => (
              <li
                key={key}
                className={`flex gap-5 py-5 ${
                  i !== VALUE_KEYS.length - 1
                    ? "border-b border-brand-neutral-200"
                    : ""
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green-50 text-sm font-semibold text-brand-green-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-brand-neutral-900">
                    {t(`why.${key}Title`)}
                  </h3>
                  <p className="mt-1 text-sm text-brand-neutral-600">
                    {t(`why.${key}Desc`)}
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