import { useTranslations } from "next-intl";
import BarTitle from "@/components/common/bar-title";
import { Link } from "@/i18n/navigation";

const MostPopularError = () => {
  const t = useTranslations();
  return (
    <section className="lg:px-20 px-4 py-12">
      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <BarTitle title={t("most-popular")} highlightBarWidth="w-[27%]" mainBarWidth="w-9/12" />
      </div>

      {/* Error State Design */}
      <div className="flex flex-col items-center justify-center py-16 px-8 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-2xl border border-red-200 dark:border-red-800/30">
        {/* Icon */}
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
          {t("occasion-not-found")}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md">
          {t("occasion-id-not-exist")}
        </p>

        {/* Alternative Options */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            {t("explore-instead")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/occasions"
              className="inline-flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-700 hover:text-red-700 dark:hover:text-red-400 font-medium rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              {t("all-occasions")}
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {t("all-products")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostPopularError;
