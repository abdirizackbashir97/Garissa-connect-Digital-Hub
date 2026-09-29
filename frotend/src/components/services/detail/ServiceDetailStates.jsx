// Loading skeleton and Not-found state for ServiceDetail.
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Building2 } from "lucide-react";

export function ServiceDetailSkeleton() {
  return (
    <main className="gcx-container py-10 sm:py-14">
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-4 w-40 rounded bg-brand-neutral-100 sm:w-56" />
        <div className="h-64 rounded-2xl bg-brand-neutral-100 sm:h-96" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="h-10 w-2/3 rounded bg-brand-neutral-100 sm:h-12" />
            <div className="h-4 w-full rounded bg-brand-neutral-100" />
            <div className="h-4 w-5/6 rounded bg-brand-neutral-100" />
          </div>
          <div className="h-72 rounded-2xl bg-brand-neutral-100" />
        </div>
      </div>
    </main>
  );
}

export function ServiceDetailNotFound() {
  const { t } = useTranslation();
  return (
    <main className="gcx-container py-10 sm:py-14">
      <div className="mx-auto max-w-xl rounded-2xl border border-brand-neutral-200 bg-white p-6 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
          <Building2 size={22} aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-xl sm:text-2xl">
          {t("serviceDetailPage.notFoundTitle")}
        </h1>
        <p className="mt-3 text-sm text-brand-neutral-600 sm:text-base">
          {t("serviceDetailPage.notFoundBody")}
        </p>
        <Link
          to="/services"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-brand-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-700"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" aria-hidden="true" />
          {t("serviceDetailPage.notFoundCta")}
        </Link>
      </div>
    </main>
  );
}
