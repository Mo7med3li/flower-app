"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Error Icon with animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-maroon-600 blur-3xl opacity-20 rounded-full animate-pulse"></div>
          <div className="relative">
            <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-700 rounded-full">
              <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-400 animate-bounce" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-maroon-400 rounded-full animate-pulse delay-75"></div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            {t("something-went-wrong") || "Something Went Wrong"}
          </h1>

          {/* Description */}
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t("error-description")}
          </p>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-left">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="w-4 h-4 text-zinc-500" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t("error-details")}
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={reset}
              className="bg-maroon-600 hover:bg-maroon-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t("try-again")}
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-maroon-600 text-maroon-600 hover:bg-maroon-50 dark:border-soft-pink-300 dark:text-soft-pink-300 dark:hover:bg-zinc-700 rounded-full px-8"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {t("go-home")}
              </Link>
            </Button>
          </div>

          {/* Helpful Actions */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{t("while-you-wait")}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/categories"
                className="px-3 py-1 text-sm bg-maroon-50 text-maroon-700 rounded-full hover:bg-maroon-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600 transition-colors"
              >
                {t("browse-categories")}
              </Link>
              <Link
                href="/products"
                className="px-3 py-1 text-sm bg-soft-pink-50 text-maroon-700 rounded-full hover:bg-soft-pink-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600 transition-colors"
              >
                {t("shop-products")}
              </Link>
              <Link
                href="/contact"
                className="px-3 py-1 text-sm bg-rose-50 text-maroon-700 rounded-full hover:bg-rose-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600 transition-colors"
              >
                {t("contact-support")}
              </Link>
            </div>
          </div>

          {/* Reassurance Message */}
          <div className="mt-6 p-4 bg-gradient-to-r from-maroon-50 to-soft-pink-50 dark:from-zinc-800 dark:to-zinc-700 rounded-xl">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{t("error-reassurance")}</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-red-200 to-pink-300 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-maroon-200 to-red-300 rounded-full opacity-20 blur-xl animate-pulse delay-150"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-soft-pink-200 to-rose-200 rounded-full opacity-15 blur-xl animate-pulse delay-300"></div>
      </div>
    </div>
  );
}
