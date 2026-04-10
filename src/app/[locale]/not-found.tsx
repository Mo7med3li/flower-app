"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* 404 Number with decorative elements */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-600 to-soft-pink-400 blur-3xl opacity-20 rounded-full"></div>
          <div className="relative">
            <div className="text-9xl font-bold bg-gradient-to-r from-maroon-600 to-soft-pink-400 bg-clip-text text-transparent">
              404
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-soft-pink-200 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-maroon-200 rounded-full animate-pulse delay-75"></div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-maroon-50 to-soft-pink-50 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl">
              <Search className="w-12 h-12 text-maroon-600 dark:text-soft-pink-300" />
            </div>
          </div>

          {/* Title and Description */}
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            {t("page-not-found")}
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t("page-is-not-found")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              className="bg-maroon-600 hover:bg-maroon-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {t("go-home")}
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-maroon-600 text-maroon-600 hover:bg-maroon-50 dark:border-soft-pink-300 dark:text-soft-pink-300 dark:hover:bg-zinc-700 rounded-full px-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("go-back") || "Go To Previous Page"}
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{t("looking-for")}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/categories"
                className="px-3 py-1 text-sm bg-maroon-50 text-maroon-700 rounded-full hover:bg-maroon-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600 transition-colors"
              >
                {t("categories")}
              </Link>
              <Link
                href="/products"
                className="px-3 py-1 text-sm bg-soft-pink-50 text-maroon-700 rounded-full hover:bg-soft-pink-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600 transition-colors"
              >
                {t("products")}
              </Link>
              <Link
                href="/occasions"
                className="px-3 py-1 text-sm bg-rose-50 text-maroon-700 rounded-full hover:bg-rose-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600 transition-colors"
              >
                {t("occasions")}
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-200 to-soft-pink-300 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-maroon-200 to-rose-300 rounded-full opacity-20 blur-xl animate-pulse delay-150"></div>
      </div>
    </div>
  );
}
