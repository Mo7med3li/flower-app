"use client";

import { Package2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface EmptyProductsStateProps {
  occasion?: string;
}

export default function EmptyProductsState({ occasion }: EmptyProductsStateProps) {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center px-4 py-12">
      {/* Icon Container */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-maroon-100 to-soft-pink-100 dark:from-maroon-900 dark:to-soft-pink-900 rounded-full flex items-center justify-center">
          <Package2 className="w-12 h-12 text-maroon-600 dark:text-soft-pink-300" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse delay-75" />
      </div>

      {/* Main Message */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        {t("no-products-in-this-occasion")}
      </h3>

      {/* Subtitle */}
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md">
        {occasion ? t("no-products-for-occasion", { occasion }) : t("no-products-available")}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-maroon-600 hover:bg-maroon-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {t("browse-all-products")}
        </button>

        <button
          onClick={() => router.refresh()}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200"
        >
          {t("try-again")}
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-yellow-200/30 to-pink-200/30 dark:from-yellow-800/20 dark:to-pink-800/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-maroon-200/30 to-soft-pink-200/30 dark:from-maroon-800/20 dark:to-soft-pink-800/20 rounded-full blur-xl" />
      </div>
    </div>
  );
}
