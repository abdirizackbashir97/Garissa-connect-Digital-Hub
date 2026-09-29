// src/components/layout/Footer.jsx
//
// Site footer — every label comes from translations.

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";

import logo from "../../assets/logo/garissa-connect-logo.png";

/* Inline SVG brand icons (Lucide v1 removed them) */
function FacebookIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const NAV_KEYS = ["home", "about", "opportunities", "businesses", "events", "community", "resources"];
const NAV_PATHS = {
  home: "/",
  about: "/about",
  opportunities: "/opportunities",
  businesses: "/businesses",
  events: "/events",
  community: "/community",
  resources: "/resources",
};

const SUPPORT_KEYS = ["contact", "faq", "help"];
const SUPPORT_PATHS = {
  contact: "/contact",
  faq: "/faq",
  help: "/help",
};

const SOCIAL = [
  { label: "Facebook",  href: "#", icon: FacebookIcon },
  { label: "Twitter",   href: "#", icon: TwitterIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn",  href: "#", icon: LinkedinIcon },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-neutral-200 bg-white">
      <div className="gcx-container py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="GarissaConnect logo"
                className="h-9 w-auto"
              />
              <span className="text-base font-semibold text-brand-green-700">
                GarissaConnect
              </span>
            </Link>
            <p className="mt-4 text-sm text-brand-neutral-600">
              {t("footer.brandDesc")}
            </p>

            <div className="mt-5 flex gap-2">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-brand-neutral-200 text-brand-neutral-600 transition-colors hover:border-brand-green-500 hover:text-brand-green-700"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-neutral-900">
              {t("footer.navigation")}
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    to={NAV_PATHS[key]}
                    className="text-sm text-brand-neutral-600 hover:text-brand-green-700"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-neutral-900">
              {t("footer.support")}
            </h3>
            <ul className="mt-4 space-y-2">
              {SUPPORT_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    to={SUPPORT_PATHS[key]}
                    className="text-sm text-brand-neutral-600 hover:text-brand-green-700"
                  >
                    {t(`footer.${key}Link`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-neutral-900">
              {t("footer.contact")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-neutral-600">
              <li className="inline-flex items-center gap-2">
                <Mail size={14} aria-hidden="true" />
                {t("footer.contactEmail")}
              </li>
              <li>{t("footer.contactLocation")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-brand-neutral-200">
        <div className="gcx-container flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-brand-neutral-600">
            {t("footer.copyright", { year })}
          </p>
          <p className="text-xs text-brand-neutral-400">
            {t("footer.builtFor")}
          </p>
        </div>
      </div>
    </footer>
  );
}