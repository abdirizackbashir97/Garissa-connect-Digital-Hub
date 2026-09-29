// src/components/services/detail/ServiceDetailGallery.jsx
//
// Professional image mosaic under the hero.
// Desktop: 1 large image + 2 stacked on the right.
// Mobile: 1 big image + 2 side by side below.

import { useTranslation } from "react-i18next";
import { Image as ImageIcon } from "lucide-react";

export default function ServiceDetailGallery({ images, name }) {
  const { t } = useTranslation();

  if (!images || images.length === 0) return null;

  const hasMosaic = images.length >= 3;
  const [main, second, third] = images;
  const extras = Math.max(0, images.length - 3);

  return (
    <section
      aria-label={t("serviceDetailPage.galleryHeading", {
        defaultValue: "Photo gallery",
      })}
      className="border-b border-brand-neutral-200 bg-white"
    >
      <div className="gcx-container py-6 sm:py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-brand-neutral-900 sm:text-base">
            <ImageIcon
              size={16}
              className="text-brand-green-600"
              aria-hidden="true"
            />
            {t("serviceDetailPage.galleryHeading", {
              defaultValue: "Photo gallery",
            })}
          </h2>
          <span className="text-xs text-brand-neutral-500">
            {images.length}{" "}
            {t("serviceDetailPage.galleryPhotosLabel", {
              defaultValue: "photos",
            })}
          </span>
        </div>

        {hasMosaic ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            <div className="col-span-4 aspect-[16/10] overflow-hidden rounded-2xl bg-brand-neutral-100 sm:col-span-3">
              <img
                src={main}
                alt={`${name} — photo 1`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="col-span-4 grid grid-cols-2 gap-2 sm:col-span-1 sm:grid-cols-1 sm:gap-3 lg:gap-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-neutral-100">
                <img
                  src={second}
                  alt={`${name} — photo 2`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-neutral-100">
                <img
                  src={third}
                  alt={`${name} — photo 3`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                {extras > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-brand-green-900/60 text-sm font-semibold text-white backdrop-blur-[2px]">
                    +{extras}{" "}
                    {t("serviceDetailPage.galleryMoreLabel", {
                      defaultValue: "more",
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ul className="flex gap-3 overflow-x-auto pb-2">
            {images.map((src, i) => (
              <li
                key={i}
                className="h-40 w-64 shrink-0 overflow-hidden rounded-2xl bg-brand-neutral-100"
              >
                <img
                  src={src}
                  alt={`${name} — photo ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
