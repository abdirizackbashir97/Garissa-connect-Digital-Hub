// FAQ accordion for a service.

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

export default function ServiceDetailFAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);

  const items = ["one", "two", "three", "four"];

  return (
    <article className="rounded-2xl border border-brand-neutral-200 bg-white p-5 sm:p-6 lg:p-8">
      <h2 className="text-lg font-semibold text-brand-neutral-900 sm:text-xl">
        {t("serviceDetailPage.faqHeading")}
      </h2>
      <div className="mt-3 h-px bg-brand-neutral-100" />

      <ul className="mt-5 space-y-3">
        {items.map((key, i) => {
          const isOpen = open === i;
          return (
            <li key={key} className="rounded-xl border border-brand-neutral-200">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-start"
              >
                <span className="text-sm font-semibold text-brand-neutral-900 sm:text-base">
                  {t(`serviceDetailPage.faq_${key}_q`)}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-brand-neutral-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <p className="border-t border-brand-neutral-100 px-4 py-3.5 text-sm text-brand-neutral-600">
                  {t(`serviceDetailPage.faq_${key}_a`)}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
