// Location section with a real Leaflet map + floating info card.
// Uses a CartoDB light tile layer for a cleaner, more premium look.

import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Garissa County approximate center. Real coordinates will come from
// the provider record once the backend stores lat/lng.
const GARISSA_CENTER = [-0.4536, 39.6461];

// Custom marker: brand green circle with a pin, avoids Leaflet's
// default icon asset paths (a common Vite gotcha).
const brandIcon = new L.DivIcon({
  html: `<div style="
    background:#1f7a3f; width:36px; height:36px;
    border-radius:50% 50% 50% 0; transform: rotate(-45deg);
    display:flex; align-items:center; justify-content:center;
    border:3px solid #fff; box-shadow:0 6px 18px rgba(0,0,0,.25);
  "><span style="transform: rotate(45deg); color:#fff; font-size:16px;">📍</span></div>`,
  className: "",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -32],
});

export default function ServiceDetailLocation({ service }) {
  const { t } = useTranslation();

  const address = service.location || "Garissa County, Kenya";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <section id="location" className="scroll-mt-32">
      <div className="overflow-hidden rounded-2xl border border-brand-neutral-200 bg-white">
        <header className="border-b border-brand-neutral-100 p-5 sm:p-6 lg:p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
            {t("serviceDetailPage.locationEyebrow", {
              defaultValue: "Find us",
            })}
          </span>
          <h2 className="mt-2 text-lg font-semibold text-brand-neutral-900 sm:text-xl">
            {t("serviceDetailPage.locationHeading", {
              defaultValue: "Where to find this service",
            })}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-brand-neutral-600">
            {t("serviceDetailPage.locationSubhead", {
              defaultValue:
                "Visit the provider at their premises, or call ahead to arrange.",
            })}
          </p>
        </header>

        <div className="relative">
          {/* Map */}
          <div className="h-[20rem] w-full sm:h-[24rem] lg:h-[26rem]">
            <MapContainer
              center={GARISSA_CENTER}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <Marker position={GARISSA_CENTER} icon={brandIcon}>
                <Popup>{service.provider_name || service.name}</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Floating info card (desktop) */}
          <div className="pointer-events-none absolute inset-y-0 start-0 hidden items-center p-6 lg:flex">
            <div className="pointer-events-auto w-80 rounded-2xl border border-brand-neutral-200 bg-white/95 p-5 shadow-xl backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-neutral-400">
                {service.provider_name || service.name}
              </p>

              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-brand-green-600"
                    aria-hidden="true"
                  />
                  <span className="text-brand-neutral-800">{address}</span>
                </div>
                {service.phone && (
                  <div className="flex items-start gap-3">
                    <Phone
                      size={15}
                      className="mt-0.5 shrink-0 text-brand-green-600"
                      aria-hidden="true"
                    />
                    <a
                      href={`tel:${service.phone}`}
                      className="break-all font-medium text-brand-green-700 hover:text-brand-green-600"
                    >
                      {service.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Clock
                    size={15}
                    className="mt-0.5 shrink-0 text-brand-green-600"
                    aria-hidden="true"
                  />
                  <span className="text-brand-neutral-800">
                    {t("serviceDetailPage.hoursValue")}
                  </span>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green-700"
              >
                <Navigation size={14} aria-hidden="true" />
                {t("serviceDetailPage.getDirections", {
                  defaultValue: "Get directions",
                })}
              </a>
            </div>
          </div>
        </div>

        {/* Info card — mobile/tablet below the map */}
        <div className="border-t border-brand-neutral-100 p-5 sm:p-6 lg:hidden">
          <div className="flex items-start gap-3">
            <MapPin
              size={16}
              className="mt-0.5 shrink-0 text-brand-green-600"
              aria-hidden="true"
            />
            <span className="text-sm text-brand-neutral-800">{address}</span>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green-700"
          >
            <Navigation size={14} aria-hidden="true" />
            {t("serviceDetailPage.getDirections", {
              defaultValue: "Get directions",
            })}
          </a>
        </div>
      </div>
    </section>
  );
}
