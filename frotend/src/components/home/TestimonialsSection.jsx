import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const CARDS = [
  { id: 1, initials: "AA", accent: "green" },
  { id: 2, initials: "MW", accent: "gold" },
  { id: 3, initials: "HF", accent: "green" },
];

export default function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
            {t("testimonials.eyebrow")}
          </span>
          <h2 className="mt-3">{t("testimonials.heading")}</h2>
          <p className="mt-4 text-brand-neutral-600 text-pretty">
            {t("testimonials.subhead")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CARDS.map((card, i) => {
            const isGold = card.accent === "gold";
            return (
              <motion.figure
                key={card.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex flex-col rounded-2xl border border-brand-neutral-200 bg-white p-7 transition-shadow hover:shadow-md"
              >
                <Quote
                  size={28}
                  className={
                    isGold ? "text-brand-gold-400" : "text-brand-green-500"
                  }
                  aria-hidden="true"
                />

                <blockquote className="mt-5 flex-1 text-brand-neutral-700 text-pretty">
                  "{t(`testimonials.t${card.id}Quote`)}"
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-neutral-100 pt-5">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${
                      isGold
                        ? "bg-brand-gold-100 text-brand-gold-600"
                        : "bg-brand-green-50 text-brand-green-700"
                    }`}
                    aria-hidden="true"
                  >
                    {card.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-neutral-900">
                      {t(`testimonials.t${card.id}Name`)}
                    </p>
                    <p className="text-xs text-brand-neutral-500">
                      {t(`testimonials.t${card.id}Role`)} ·{" "}
                      {t(`testimonials.t${card.id}Location`)}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}