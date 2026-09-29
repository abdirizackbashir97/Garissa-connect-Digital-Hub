import { useTranslation } from "react-i18next";
import { Globe, Smartphone, Phone, MessageSquare, Mic } from "lucide-react";
import { motion } from "framer-motion";

const CHANNELS = [
  { key: "web",    icon: Globe,         available: true },
  { key: "mobile", icon: Smartphone,    available: true },
  { key: "sms",    icon: MessageSquare, available: false },
  { key: "ussd",   icon: Phone,         available: false },
  { key: "voice",  icon: Mic,           available: false },
];

export default function AccessChannelsSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="gcx-container gcx-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-700">
              {t("accessChannels.eyebrow")}
            </span>
            <h2 className="mt-3">{t("accessChannels.heading")}</h2>
            <p className="mt-5 text-brand-neutral-600 text-pretty">
              {t("accessChannels.subhead")}
            </p>

            <div className="mt-8 rounded-xl border border-brand-green-100 bg-brand-green-50/60 p-5">
              <p className="text-sm text-brand-green-800">
                <strong className="font-semibold">
                  {t("accessChannels.commitmentLabel")}
                </strong>{" "}
                {t("accessChannels.commitmentText")}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {CHANNELS.map((channel, i) => {
                const Icon = channel.icon;
                return (
                  <motion.li
                    key={channel.key}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group flex items-start gap-4 rounded-xl border border-brand-neutral-200 bg-white p-5 transition-all hover:border-brand-green-300 hover:shadow-sm sm:gap-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green-50 text-brand-green-700 transition-colors group-hover:bg-brand-green-500 group-hover:text-white">
                      <Icon size={20} aria-hidden="true" />
                    </span>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-brand-neutral-900">
                          {t(`accessChannels.${channel.key}.name`)}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            channel.available
                              ? "bg-brand-green-100 text-brand-green-700"
                              : "bg-brand-gold-100 text-brand-gold-600"
                          }`}
                        >
                          {channel.available
                            ? t("accessChannels.available")
                            : t("accessChannels.comingSoon")}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-brand-neutral-600">
                        {t(`accessChannels.${channel.key}.desc`)}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}