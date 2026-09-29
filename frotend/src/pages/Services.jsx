// src/pages/Services.jsx

import { useState } from "react";

import ServicesHero from "../components/services/ServicesHero";
import ServiceCategories from "../components/services/ServiceCategories";
import PopularServices from "../components/services/PopularServices";

export default function Services() {
  const [search, setSearch] = useState("");

  return (
    <main>
      <ServicesHero search={search} onSearchChange={setSearch} />
      <ServiceCategories />
      <PopularServices search={search} />
    </main>
  );
}
