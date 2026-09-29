import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, BadgeCheck, ArrowRight } from "lucide-react";
import { categoryKey } from "../../utils/categoryTranslations";
import { categoryImages } from "../../utils/categoryImages";
import { serviceImages } from "../../utils/serviceImages";

export default function ServiceCard({ service }) {
  const { t } = useTranslation();
  const isVerified = service.is_verified === 1;

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

  // Image priority:
  //   1. Per-service image map (hand-curated)
  //   2. DB image column
  //   3. Category fallback
  const specific = serviceImages(service.id);
  const gallery = categoryImages(catKey);
  const image =
    specific[0] || service.image || (gallery && gallery[0]) || null;

  return (
    <Link
      to={`/services/${service.id}`}
      aria-label={name}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-neutral-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-green-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-500 focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-brand-neutral-100">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-green-50 text-3xl">
            {service.category_icon || "•"}
          </div>
        )}

        {/* Category chip over image (bottom-left) */}
        <span className="absolute bottom-3 start-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-brand-neutral-800 shadow-sm backdrop-blur-sm">
          <span aria-hidden="true">{service.category_icon || "•"}</span>
          <span className="truncate max-w-[10rem]">{catName}</span>
        </span>

        {/* Verified badge (top-right) */}
        {isVerified && (
          <span className="absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-brand-gold-500 px-2.5 py-1 text-[10px] font-semibold text-brand-green-900 shadow">
            <BadgeCheck size={12} aria-hidden="true" />
            {t("servicesPage.cardVerified")}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug text-brand-neutral-900 transition group-hover:text-brand-green-700">
          {name}
        </h3>

        {service.provider_name && (
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-brand-neutral-400">
            {service.provider_name}
          </p>
        )}

        <p className="mt-3 line-clamp-3 flex-1 text-sm text-brand-neutral-600">
          {desc}
        </p>

        <dl className="mt-4 space-y-1.5 border-t border-brand-neutral-100 pt-4 text-xs text-brand-neutral-600">
          {service.location && (
            <div className="flex items-center gap-1.5">
              <MapPin
                size={13}
                className="text-brand-neutral-400"
                aria-hidden="true"
              />
              <span className="truncate">{service.location}</span>
            </div>
          )}
          {service.phone && (
            <div className="flex items-center gap-1.5">
              <Phone
                size={13}
                className="text-brand-neutral-400"
                aria-hidden="true"
              />
              <span className="truncate">{service.phone}</span>
            </div>
          )}
        </dl>

        {/* CTA */}
        <span className="mt-5 inline-flex items-center justify-between rounded-md border border-brand-neutral-200 px-3 py-2.5 text-sm font-medium text-brand-neutral-800 transition group-hover:border-brand-green-600 group-hover:bg-brand-green-600 group-hover:text-white">
          {t("servicesPage.cardViewDetails")}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}