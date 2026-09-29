// Reviews section with rating breakdown and a few review cards.

import { useTranslation } from "react-i18next";
import { Star, ThumbsUp } from "lucide-react";

const BREAKDOWN = [
  { stars: 5, count: 15 },
  { stars: 4, count: 6 },
  { stars: 3, count: 2 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];

const REVIEWS = [
  {
    id: 1,
    name: "Community member",
    initials: "CM",
    rating: 5,
    date: "12 Sep 2026",
    text: "Fast, professional and friendly. Would recommend to anyone in the area.",
  },
  {
    id: 2,
    name: "Local resident",
    initials: "LR",
    rating: 5,
    date: "28 Aug 2026",
    text: "Easy to reach and delivered exactly what was promised.",
  },
];

export default function ServiceDetailReviews() {
  const { t } = useTranslation();
  const totalReviews = BREAKDOWN.reduce((s, r) => s + r.count, 0);
  const avg =
    totalReviews === 0
      ? 0
      : BREAKDOWN.reduce((s, r) => s + r.stars * r.count, 0) / totalReviews;

  return (
    <article className="rounded-2xl border border-brand-neutral-200 bg-white p-5 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-brand-neutral-900 sm:text-xl">
          {t("serviceDetailPage.reviewsHeading")}
        </h2>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-brand-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-neutral-700 transition hover:bg-brand-neutral-50 sm:text-sm"
        >
          {t("serviceDetailPage.writeReview")}
        </button>
      </div>
      <div className="mt-3 h-px bg-brand-neutral-100" />

      <div className="mt-6 grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">

        {/* Left: average + breakdown */}
        <div className="text-center sm:text-start">
          <p className="text-5xl font-semibold text-brand-neutral-900">
            {avg.toFixed(1)}
          </p>
          <div className="mt-2 inline-flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={14}
                className={
                  n <= Math.round(avg)
                    ? "fill-brand-gold-400 text-brand-gold-400"
                    : "text-brand-neutral-200"
                }
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-brand-neutral-500">
            {totalReviews} {t("serviceDetailPage.reviewsCountLabel")}
          </p>
        </div>

        {/* Right: bars */}
        <ul className="space-y-2">
          {BREAKDOWN.map((row) => {
            const pct = totalReviews === 0 ? 0 : (row.count / totalReviews) * 100;
            return (
              <li key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="inline-flex w-10 shrink-0 items-center gap-1 text-brand-neutral-600">
                  {row.stars}
                  <Star
                    size={11}
                    className="fill-brand-gold-400 text-brand-gold-400"
                    aria-hidden="true"
                  />
                </span>
                <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-brand-neutral-100">
                  <span
                    className="absolute inset-y-0 start-0 rounded-full bg-brand-gold-400"
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-end text-brand-neutral-500">
                  {row.count}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Review cards */}
      <ul className="mt-8 space-y-4 border-t border-brand-neutral-100 pt-6">
        {REVIEWS.map((r) => (
          <li key={r.id} className="rounded-xl border border-brand-neutral-200 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-50 text-sm font-semibold text-brand-green-700"
                aria-hidden="true"
              >
                {r.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <p className="text-sm font-semibold text-brand-neutral-900">
                    {r.name}
                  </p>
                  <span className="text-xs text-brand-neutral-400">
                    · {r.date}
                  </span>
                </div>
                <div className="mt-1 inline-flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={12}
                      className={
                        n <= r.rating
                          ? "fill-brand-gold-400 text-brand-gold-400"
                          : "text-brand-neutral-200"
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-brand-neutral-700">
                  {r.text}
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand-neutral-500 hover:text-brand-green-700"
                >
                  <ThumbsUp size={12} aria-hidden="true" />
                  {t("serviceDetailPage.helpful")}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
