import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Sparkles, MapPin } from "lucide-react";

import useService from "../hooks/useService";
import useServices from "../hooks/useServices";
import { categoryKey } from "../utils/categoryTranslations";
import { categoryImages } from "../utils/categoryImages";
import { serviceImages } from "../utils/serviceImages";

import ServiceDetailHero from "../components/services/detail/ServiceDetailHero";
import ServiceDetailGallery from "../components/services/detail/ServiceDetailGallery";
import ServiceDetailTrustStrip from "../components/services/detail/ServiceDetailTrustStrip";
import ServiceDetailTabs from "../components/services/detail/ServiceDetailTabs";
import ServiceDetailProcess from "../components/services/detail/ServiceDetailProcess";
import ServiceDetailPackages from "../components/services/detail/ServiceDetailPackages";
import ServiceDetailLocation from "../components/services/detail/ServiceDetailLocation";
import ServiceDetailSidebar from "../components/services/detail/ServiceDetailSidebar";
import ServiceDetailReviews from "../components/services/detail/ServiceDetailReviews";
import ServiceDetailFAQ from "../components/services/detail/ServiceDetailFAQ";
import ServiceDetailSafety from "../components/services/detail/ServiceDetailSafety";
import ServiceDetailAssistant from "../components/services/detail/ServiceDetailAssistant";
import {
  ServiceDetailSkeleton,
  ServiceDetailNotFound,
} from "../components/services/detail/ServiceDetailStates";

export default function ServiceDetail() {
  const { t } = useTranslation();
  const { id } = useParams();

  const { service, loading, error } = useService(id);
  const related = useServices(
    service?.category_name ? { category: service.category_name } : {}
  );

  if (loading) return <ServiceDetailSkeleton />;
  if (error || !service) return <ServiceDetailNotFound />;

  const catKey = categoryKey(service.category_name);
  const catName = catKey
    ? t(`servicesCategories.${catKey}`)
    : service.category_name;

  const name = t(`servicesCatalog.svc${service.id}Name`, {
    defaultValue: service.name,
  });
  const desc = t(`servicesCatalog.svc${service.id}Desc`, {
    defaultValue: service.description,
  });

  const relatedList = (related.services || [])
    .filter((s) => String(s.id) !== String(id))
    .slice(0, 4);

  const relatedImage = (s) => {
    const specific = serviceImages(s.id);
    const cat = categoryKey(s.category_name);
    const gallery = categoryImages(cat);
    return specific[0] || s.image || (gallery && gallery[0]) || null;
  };

  return (
    <main className="w-full overflow-x-hidden">
      <ServiceDetailHero
        service={service}
        name={name}
        catName={catName}
        catKey={catKey}
      />

      <ServiceDetailGallery
        images={[
          ...serviceImages(service.id),
          service.image,
          ...categoryImages(catKey),
        ].filter(Boolean)}
        name={name}
      />

      <ServiceDetailTrustStrip />

      <ServiceDetailTabs />

      <section className="gcx-container py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3 lg:gap-10">
          {/* Main column */}
          <div className="min-w-0 space-y-6 lg:col-span-2 lg:space-y-8">
            {/* Overview */}
            <article
              id="overview"
              className="scroll-mt-32 rounded-2xl border border-brand-neutral-200 bg-white p-5 sm:p-6 lg:p-8"
            >
              <h2 className="text-lg font-semibold text-brand-neutral-900 sm:text-xl">
                {t("serviceDetailPage.aboutHeading")}
              </h2>
              <div className="mt-3 h-px bg-brand-neutral-100" />
              <p className="mt-5 text-sm leading-relaxed text-brand-neutral-700 sm:text-base">
                {desc}
              </p>

              <h3 className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-neutral-900">
                <Sparkles
                  size={14}
                  className="text-brand-gold-500"
                  aria-hidden="true"
                />
                {t("serviceDetailPage.includedHeading")}
              </h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {["one", "two", "three", "four"].map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-2 text-xs text-brand-neutral-700 sm:text-sm"
                  >
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green-600" />
                    {t(`serviceDetailPage.expect_${key}`)}
                  </li>
                ))}
              </ul>
            </article>

            {/* How it works */}
            <ServiceDetailProcess />

            {/* Packages */}
            <ServiceDetailPackages service={service} />

            {/* Location map */}
            <ServiceDetailLocation service={service} />

            {/* Reviews */}
            <div id="reviews" className="scroll-mt-32">
              <ServiceDetailReviews />
            </div>

            {/* FAQ */}
            <div id="faq" className="scroll-mt-32">
              <ServiceDetailFAQ />
            </div>

            {/* Trust & Safety */}
            <ServiceDetailSafety />

            {/* Contact — mobile/tablet only */}
            <div id="contact" className="scroll-mt-32 lg:hidden">
              <ServiceDetailSidebar service={service} />
            </div>
          </div>

          {/* Sidebar — desktop */}
          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-32">
              <ServiceDetailSidebar service={service} />
            </div>
          </aside>
        </div>
      </section>

      {/* Related services — full-width */}
      {relatedList.length > 0 && (
        <section className="border-t border-brand-neutral-200 bg-brand-neutral-50">
          <div className="gcx-container py-12 sm:py-16">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
                  {t("serviceDetailPage.relatedEyebrow", {
                    defaultValue: "Similar services",
                  })}
                </span>
                <h2 className="mt-2 text-2xl font-semibold text-brand-neutral-900 sm:text-3xl">
                  {t("serviceDetailPage.relatedHeading")}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-brand-neutral-600">
                  {t("serviceDetailPage.relatedSubhead", {
                    defaultValue:
                      "Other trusted providers in the same category.",
                  })}
                </p>
              </div>
              <Link
                to={`/services/category/${catKey}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-green-700 hover:text-brand-green-600"
              >
                {t("serviceDetailPage.viewAllServices")}
                <ArrowRight
                  size={14}
                  className="rtl:rotate-180"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedList.map((r) => {
                const rKey = categoryKey(r.category_name);
                const rCat = rKey
                  ? t(`servicesCategories.${rKey}`)
                  : r.category_name;
                const rName = t(`servicesCatalog.svc${r.id}Name`, {
                  defaultValue: r.name,
                });
                const rImg = relatedImage(r);
                const isVerified = r.is_verified === 1;

                return (
                  <Link
                    key={r.id}
                    to={`/services/${r.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-brand-neutral-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-green-300 hover:shadow-xl"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-brand-neutral-100 sm:h-40">
                      {rImg ? (
                        <img
                          src={rImg}
                          alt={rName}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-brand-green-50 text-2xl">
                          {r.category_icon || "•"}
                        </div>
                      )}

                      {isVerified && (
                        <span className="absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-brand-gold-500/95 px-2 py-0.5 text-[10px] font-semibold text-brand-green-900 shadow-sm backdrop-blur-sm">
                          {t("servicesPage.cardVerified")}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-brand-green-700">
                        {rCat}
                      </p>
                      <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-brand-neutral-900 transition group-hover:text-brand-green-700">
                        {rName}
                      </h3>

                      {r.location && (
                        <p className="mt-2 inline-flex items-center gap-1 text-xs text-brand-neutral-500">
                          <MapPin size={11} aria-hidden="true" />
                          <span className="truncate">{r.location}</span>
                        </p>
                      )}

                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-green-700 opacity-0 transition-opacity group-hover:opacity-100">
                        {t("servicesPage.cardViewDetails")}
                        <ArrowRight
                          size={12}
                          className="rtl:rotate-180"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back CTA */}
      <section className="gcx-container py-10 text-center sm:py-14">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-md border border-brand-neutral-200 px-5 py-2.5 text-sm font-medium text-brand-neutral-800 hover:bg-brand-neutral-50"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" aria-hidden="true" />
          {t("serviceDetailPage.viewAllServices")}
        </Link>
      </section>

      {/* Floating AI assistant (always visible) */}
      <ServiceDetailAssistant service={service} />

      {/* Mobile sticky CTA */}
      {service.phone && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-neutral-200 bg-white/95 p-3 backdrop-blur-sm lg:hidden">
          <a
            href={`tel:${service.phone}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-green-700"
          >
            {t("serviceDetailPage.callNow")} · {service.phone}
          </a>
        </div>
      )}
    </main>
  );
}