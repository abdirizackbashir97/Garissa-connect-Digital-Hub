import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

import logo from "../../assets/logo/garissa-connect-logo.png";
import MobileMenu from "../navigation/MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { PRIMARY_NAV } from "../../utils/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  // 1. Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // 2. Toggle shadow after the user scrolls past 8px
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${
        isScrolled ? "border-b border-brand-neutral-200 shadow-sm" : ""
      }`}
    >
      <div className="gcx-container">
        <div className="flex h-16 items-center justify-between">

          {/* ---------- Logo ---------- */}
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md"
            aria-label="GarissaConnect — Go to homepage"
          >
            <img
              src={logo}
              alt="GarissaConnect logo"
              className="h-10 w-auto"
            />
            <span className="hidden text-lg font-semibold text-brand-green-700 sm:inline">
              
            </span>
          </Link>

          {/* ---------- Desktop navigation ---------- */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-brand-green-700"
                    : "text-brand-neutral-600 hover:text-brand-green-700"
                }`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </nav>

          {/* ---------- Desktop actions ---------- */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <Link
              to="/login"
              className="rounded-md border border-brand-neutral-200 px-4 py-2 text-sm font-medium text-brand-neutral-800 hover:bg-brand-neutral-50"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-brand-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-600"
            >
              {t("nav.getStarted")}
            </Link>
          </div>

          {/* ---------- Mobile: language + hamburger ---------- */}
          <div className="flex items-center gap-1 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-neutral-800 hover:bg-brand-neutral-100"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={PRIMARY_NAV}
      />
    </header>
  );
}