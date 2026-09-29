// src/pages/CategoryPage.jsx
//
// Category landing page. Beautiful hero image keyed to the category,
// then a polished grid of that category's services with sorting.
// Ends with related categories + a warm CTA.

import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  ChevronRight,
  Search,
  Sparkles,
  LayoutGrid,
  BadgeCheck,
} from "lucide-react";

import useCategories from "../hooks/useCategories";
import useServices from "../hooks/useServices";
import {
  categoryKey,
  categoryNameFromKey,
} from "../utils/categoryTranslations";
import { categoryImages } from "../utils/categoryImages";
import ServiceCard from "../components/services/ServiceCard";

export default function CategoryPage() {
  const { t } = useTranslation();
  const { catKey } = useParams();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("verified");

  const { categories, loading: catLoading, error: catError } = useCategories();
  const { services, loading: svcLoading, error: svcError } = useServices({});

  // The English DB name for this key (needed to match services)
  const catName = categoryNameFromKey(catKey);

  // The full category object (description, icon) from the API
  const category = useMemo(() => {
    if (!categories || !catName) return null;
    return categories.find((c) => c.name === catName) || null;
  }, [categories, catName]);

  // Services that belong to this category
  const categoryServices = useMemo(() => {
    if (!services || !catName) return [];
    return services.filter((s) => s.category_name === catName);
  }, [services, catName]);

  // Apply search + sort on top of the category list
  const visibleServices = useMemo(() => {
    let list = [...categoryServices];

    // Search filter
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((s) => {
        const name = t(`servicesCatalog.svc${s.id}Name`, {
          defaultValue: s.name,
        });
        const desc = t(`servicesCatalog.svc${s.id}Desc`, {
          defaultValue: s.description,
        });
        return (
          name.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
        );
      });
    }

    // Sort
    if (sort === "verified") {
      list.sort((a, b) => {
        if (a.is_verified !== b.is_verified) return b.is_verified - a.is_verified;
        return a.name.localeCompare(b.name);
      });
    } else if (sort === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [categoryServices, search, sort, t]);

  // ---- Not a valid key at all ----
  const keyIsValid = catName !== null;

  if (!keyIsValid) {
    return (
      <main className="gcx-container gcx-section">
        <div className="mx-auto max-w-xl rounded-2xl border border-brand-neutral-200 bg-white p-10 text-center">
          <h1 className="text-2xl">
            {t("categoryPage.notFoundTitle")}
          </h1>
          <p className="mt-3 text-brand-neutral-600">
            {t("categoryPage.notFoundBody")}
          </p>
          <Link
            to="/services"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-brand-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-700"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" aria-hidden="true" />
            {t("categoryPage.notFoundCta")}
          </Link>
        </div>
      </main>
    );
  }

  // Pick hero images for this category
  const heroImages = categoryImages(catKey);
  const heroImage = heroImages[0];

  const total = categoryServices.length;
  const shown = visibleServices.length;

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative">
        <div className="relative h-[24rem] w-full overflow-hidden bg-brand-neutral-900 sm:h-[28rem] lg:h-[32rem]">
          <img
            src={heroImage}
            alt={catName}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-green-900/95 via-brand-green-900/60 to-brand-green-900/25"
          />

          {/* Breadcrumb */}
          <div className="absolute inset-x-0 top-0">
            <div className="gcx-container">
              <nav aria-label="Breadcrumb" className="py-5 text-sm text-white/85">
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <Link to="/" className="inline-flex items-center gap-1 hover:text-white">
                      <Home size={13} aria-hidden="true" />
                      {t("categoryPage.breadcrumbHome")}
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight size={13} className="rtl:rotate-180" />
                  </li>
                  <li>
                    <Link to="/services" className="hover:text-white">
                      {t("categoryPage.breadcrumbServices")}
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight size={13} className="rtl:rotate-180" />
                  </li>
                  <li>
                    <span className="font-medium text-white">
                      {category ? t(`servicesCategories.${catKey}`) : catName}
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Hero title block */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="gcx-container">
              <div className="pb-10 sm:pb-14">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
                  <Sparkles size={13} aria-hidden="true" />
                  {t("categoryPage.heroEyebrow")}
                </span>

                <div className="mt-5 flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl backdrop-blur-sm ring-1 ring-white/20 sm:h-16 sm:w-16 sm:text-3xl"
                    aria-hidden="true"
                  >
                    {category?.icon || "•"}
                  </span>
                  <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {t(`servicesCategories.${catKey}`)}
                  </h1>
                </div>

                {category?.description && (
                  <p className="mt-4 max-w-2xl text-base text-white/85 text-pretty sm:text-lg">
                    {t(`servicesCategoriesDesc.${catKey}`, {
                      defaultValue: category.description,
                    })}
                  </p>
                )}

                <p className="mt-4 text-sm text-white/70">
                  {total}{" "}
                  {total === 1
                    ? t("categoryPage.servicesLabelSingular")
                    : t("categoryPage.servicesLabel")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SEARCH + SORT BAR ============ */}
      <section className="sticky top-16 z-30 border-b border-brand-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="gcx-container">
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 start-3.5 -translate-y-1/2 text-brand-neutral-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("categoryPage.searchPlaceholder")}
                className="w-full rounded-full border border-brand-neutral-200 bg-white py-2.5 ps-10 pe-4 text-sm outline-none transition focus:border-brand-green-500 focus:ring-2 focus:ring-brand-green-500/20"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-xs font-medium uppercase tracking-wider text-brand-neutral-500"
              >
                {t("categoryPage.sortBy")}
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border border-brand-neutral-200 bg-white px-3 py-2 text-sm text-brand-neutral-800 outline-none focus:border-brand-green-500"
              >
                <option value="verified">
                  {t("categoryPage.sortVerified")}
                </option>
                <option value="name-asc">{t("categoryPage.sortNameAsc")}</option>
                <option value="name-desc">{t("categoryPage.sortNameDesc")}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="gcx-section">
        <div className="gcx-container">

          {/* Loading */}
          {svcLoading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-xl bg-brand-neutral-100"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {!svcLoading && (svcError || catError) && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm font-medium text-red-800">
                {t("categoryPage.errorTitle")}
              </p>
              <p className="mt-1 text-xs text-red-700">
                {svcError || catError}
              </p>
            </div>
          )}

          {/* Empty (no services at all in this category) */}
          {!svcLoading && !svcError && total === 0 && (
            <div className="rounded-2xl border border-brand-neutral-200 bg-white p-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green-50 text-brand-green-700">
                <LayoutGrid size={22} aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-xl">
                {t("categoryPage.emptyTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-brand-neutral-600">
                {t("categoryPage.emptyBody")}
              </p>
              <Link
                to="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-700"
              >
                {t("categoryPage.emptyCta")}
                <ArrowRight size={15} className="rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          )}

          {/* Empty search results */}
          {!svcLoading && !svcError && total > 0 && shown === 0 && (
            <div className="rounded-2xl border border-brand-neutral-200 bg-white p-14 text-center">
              <h2 className="text-xl">
                {t("categoryPage.noResultsTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-brand-neutral-600">
                {t("categoryPage.noResultsBody")}
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-brand-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-brand-neutral-800 hover:bg-brand-neutral-50"
              >
                {t("categoryPage.clearSearch")}
              </button>
            </div>
          )}

          {/* Grid */}
          {!svcLoading && !svcError && shown > 0 && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-brand-neutral-500">
                  {shown}{" "}
                  {shown === 1
                    ? t("categoryPage.servicesLabelSingular")
                    : t("categoryPage.servicesLabel")}
                  {search && (
                    <span className="ms-1">
                      · {t("categoryPage.filteredLabel")}
                    </span>
                  )}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleServices.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============ RELATED CATEGORIES ============ */}
      {categories && categories.length > 1 && (
        <section className="bg-brand-neutral-50">
          <div className="gcx-container gcx-section">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
                  {t("categoryPage.relatedEyebrow")}
                </span>
                <h2 className="mt-2">{t("categoryPage.relatedHeading")}</h2>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-green-700 hover:text-brand-green-600"
              >
                {t("categoryPage.viewAllCategories")}
                <ArrowRight size={14} className="rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {categories
                .filter((c) => categoryKey(c.name) !== catKey)
                .slice(0, 6)
                .map((c) => {
                  const k = categoryKey(c.name);
                  const imgs = categoryImages(k);
                  return (
                    <Link
                      key={c.id}
                      to={`/services/category/${k}`}
                      className="group relative flex h-32 flex-col justify-end overflow-hidden rounded-xl ring-1 ring-brand-neutral-200 transition hover:-translate-y-0.5 hover:ring-brand-green-500"
                    >
                      <img
                        src={imgs[0]}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-brand-green-900/90 via-brand-green-900/40 to-transparent"
                      />
                      <div className="relative p-3">
                        <span className="text-lg" aria-hidden="true">
                          {c.icon || "•"}
                        </span>
                        <p className="mt-1 text-xs font-semibold leading-tight text-white">
                          {t(`servicesCategories.${k}`)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section className="gcx-container gcx-section-sm">
        <div className="relative overflow-hidden rounded-2xl bg-brand-green-700 px-6 py-14 text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-brand-gold-500/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
              <BadgeCheck size={13} aria-hidden="true" />
              {t("categoryPage.ctaEyebrow")}
            </span>
            <h2 className="mt-5 text-white text-balance">
              {t("categoryPage.ctaHeading")}
            </h2>
            <p className="mt-4 text-brand-green-100 text-pretty">
              {t("categoryPage.ctaSubhead")}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-brand-green-700 transition hover:bg-brand-green-50"
              >
                {t("categoryPage.ctaBrowse")}
                <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-base font-medium text-white transition hover:bg-white/10"
              >
                {t("categoryPage.ctaSuggest")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
