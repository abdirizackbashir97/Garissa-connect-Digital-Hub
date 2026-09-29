import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Clock, ArrowRight } from "lucide-react";

const EVENTS = [
  { key: "evt1", day: "12" },
  { key: "evt2", day: "19" },
  { key: "evt3", day: "02" },
];

export default function UpcomingEvents() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand-neutral-50">
      <div className="gcx-container gcx-section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2>{t("events.heading")}</h2>
            <p className="mt-3 text-brand-neutral-600">
              {t("events.subhead")}
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-green-700 hover:text-brand-green-600"
          >
            {t("events.viewAll")}
            <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 space-y-3">
          {EVENTS.map((event) => (
            <li key={event.key}>
              <Link
                to={`/events/${event.key}`}
                className="group flex items-center gap-5 rounded-lg border border-brand-neutral-200 bg-white p-5 transition-all hover:border-brand-green-500 hover:shadow-sm"
              >
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md bg-brand-green-50 text-brand-green-700">
                  <span className="text-xl font-semibold leading-none">
                    {event.day}
                  </span>
                  <span className="mt-1 text-xs font-medium tracking-wider">
                    {t(`events.${event.key}Month`)}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-brand-gold-600">
                    {t(`events.${event.key}Category`)}
                  </p>
                  <h3 className="mt-1 text-base">
                    {t(`events.${event.key}Name`)}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} aria-hidden="true" />
                      {t(`events.${event.key}Time`)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={14} aria-hidden="true" />
                      {t(`events.${event.key}Location`)}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="hidden text-brand-neutral-400 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 group-hover:text-brand-green-600 sm:block"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}