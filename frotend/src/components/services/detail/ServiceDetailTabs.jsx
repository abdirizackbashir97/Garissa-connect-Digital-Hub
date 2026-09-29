import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TABS = [
  { id: "overview", key: "tabOverview", fallback: "Overview" },
  { id: "process",  key: "tabProcess",  fallback: "Process" },
  { id: "packages", key: "tabPackages", fallback: "Packages" },
  { id: "location", key: "tabLocation", fallback: "Location" },
  { id: "reviews",  key: "tabReviews",  fallback: "Reviews" },
  { id: "faq",      key: "tabFaq",      fallback: "FAQ" },
];

export default function ServiceDetailTabs() {
  const { t } = useTranslation();
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const onScroll = () => {
      const fromTop = window.scrollY + 140;
      let current = TABS[0].id;
      for (const tab of TABS) {
        const el = document.getElementById(tab.id);
        if (el && el.offsetTop <= fromTop) current = tab.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-16 z-30 border-b border-brand-neutral-200 bg-white/95 backdrop-blur-sm"
    >
      <div className="gcx-container">
        <ul className="flex gap-1 overflow-x-auto py-2">
          {TABS.map((tab) => (
            <li key={tab.id} className="shrink-0">
              <button
                type="button"
                onClick={() => go(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active === tab.id
                    ? "bg-brand-green-50 text-brand-green-700"
                    : "text-brand-neutral-600 hover:bg-brand-neutral-50"
                }`}
              >
                {t(`serviceDetailPage.${tab.key}`, {
                  defaultValue: tab.fallback,
                })}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
