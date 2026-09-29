import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import CategoryPage from "../pages/CategoryPage";

function ComingSoon({ title }) {
  const { t } = useTranslation();
  return (
    <main className="gcx-container gcx-section">
      <div className="mx-auto max-w-2xl text-center">
        <h1>{title}</h1>
        <p className="mt-4 text-brand-neutral-600">
          {t("routes.comingSoonBody")}
        </p>
      </div>
    </main>
  );
}

function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="gcx-container gcx-section">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-brand-green-700">
          {t("routes.notFoundLabel")}
        </p>
        <h1 className="mt-3">{t("routes.notFoundHeading")}</h1>
        <p className="mt-4 text-brand-neutral-600">
          {t("routes.notFoundBody")}
        </p>
      </div>
    </main>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Real pages */}
      <Route path="/"                             element={<Home />} />
      <Route path="/about"                        element={<About />} />

      {/* Services — list, category, and detail
          NOTE: /services/category/:catKey must come BEFORE /services/:id
          Otherwise React Router tries to match "category" as an :id. */}
      <Route path="/services"                     element={<Services />} />
      <Route path="/services/category/:catKey"    element={<CategoryPage />} />
      <Route path="/services/:id"                 element={<ServiceDetail />} />

      {/* Placeholder routes — replace with real pages as we build them */}
      <Route path="/opportunities" element={<ComingSoon title="Opportunities" />} />
      <Route path="/businesses"    element={<ComingSoon title="Businesses" />} />
      <Route path="/events"        element={<ComingSoon title="Events" />} />
      <Route path="/community"     element={<ComingSoon title="Community" />} />
      <Route path="/resources"     element={<ComingSoon title="Resources" />} />
      <Route path="/help"          element={<ComingSoon title="Help" />} />
      <Route path="/login"         element={<ComingSoon title="Login" />} />
      <Route path="/register"      element={<ComingSoon title="Get Started" />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}