import { useTranslation } from "react-i18next";

const TEAM = [
  { key: "member1", initials: "AH", accent: "green" },
  { key: "member2", initials: "AA", accent: "gold" },
  { key: "member3", initials: "MW", accent: "green" },
  { key: "member4", initials: "HF", accent: "gold" },
];

export default function TeamSection() {
  const { t } = useTranslation();

  return (
    <section className="gcx-section">
      <div className="gcx-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
            {t("about.teamEyebrow")}
          </span>
          <h2 className="mt-3">{t("about.teamHeading")}</h2>
          <p className="mt-4 text-brand-neutral-600 text-pretty">
            {t("about.teamSubhead")}
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => {
            const isGold = member.accent === "gold";
            return (
              <article
                key={member.key}
                className="flex flex-col items-center text-center"
              >
                <span
                  className={`flex h-20 w-20 items-center justify-center rounded-full text-xl font-semibold tracking-wide ${
                    isGold
                      ? "bg-brand-gold-100 text-brand-gold-600"
                      : "bg-brand-green-50 text-brand-green-700"
                  }`}
                  aria-hidden="true"
                >
                  {member.initials}
                </span>

                <h3 className="mt-5 text-base font-semibold text-brand-neutral-900">
                  {t(`about.${member.key}Name`)}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand-green-700">
                  {t(`about.${member.key}Role`)}
                </p>
                <p className="mt-3 text-sm text-brand-neutral-600 text-pretty">
                  {t(`about.${member.key}Bio`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}