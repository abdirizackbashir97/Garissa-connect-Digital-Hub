import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({ isOpen, onClose, links }) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 top-16 z-40 bg-brand-neutral-900/40 lg:hidden"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            key="panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="fixed inset-x-0 top-16 z-50 border-b border-brand-neutral-200 bg-white lg:hidden"
          >
            <div className="gcx-container py-4">
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className="block rounded-md px-3 py-3 text-base font-medium text-brand-neutral-800 hover:bg-brand-green-50 hover:text-brand-green-700"
                    >
                      {t(`nav.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-col gap-3 border-t border-brand-neutral-200 pt-4">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="w-full rounded-md border border-brand-neutral-200 px-4 py-3 text-center text-base font-medium text-brand-neutral-800 hover:bg-brand-neutral-50"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="w-full rounded-md bg-brand-green-500 px-4 py-3 text-center text-base font-semibold text-white hover:bg-brand-green-600"
                >
                  {t("nav.getStarted")}
                </Link>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}