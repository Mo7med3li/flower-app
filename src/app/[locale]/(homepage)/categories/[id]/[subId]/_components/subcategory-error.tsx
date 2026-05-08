import { getTranslations } from "next-intl/server";
import { AlertTriangle, ArrowLeft, Home, Flower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface SubCategoryErrorProps {
  categoryId?: string;
  message?: string;
}

export default async function SubCategoryError({ categoryId, message }: SubCategoryErrorProps) {
  const t = await getTranslations();

  return (
    <section className="w-full min-h-[70vh] px-4 md:px-20 py-16 flex items-center justify-center">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Animated icon */}
        <div className="relative mx-auto w-fit">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 blur-3xl opacity-20 rounded-full animate-pulse" />
          <div className="relative p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 rounded-full border border-rose-100 dark:border-rose-800/40">
            <div className="relative">
              <Flower className="w-14 h-14 text-rose-400 dark:text-rose-500" />
              <div className="absolute -top-1 -right-1 p-0.5 bg-amber-400 rounded-full">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {t("occasion-not-found")}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {message || t("error-description")}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {categoryId && (
            <Button
              asChild
              variant="outline"
              className="rounded-full border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-2"
            >
              <Link href={`/categories/${categoryId}`}>
                <ArrowLeft className="w-4 h-4" />
                {t("go-back")}
              </Link>
            </Button>
          )}

          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-rose-500/30 gap-2"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              {t("go-home")}
            </Link>
          </Button>
        </div>

        {/* Divider */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-3">{t("while-you-wait")}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/categories"
              className="px-3 py-1 text-sm bg-rose-50 text-rose-700 rounded-full hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-950/50 transition-colors"
            >
              {t("browse-categories")}
            </Link>
            <Link
              href="/products"
              className="px-3 py-1 text-sm bg-pink-50 text-pink-700 rounded-full hover:bg-pink-100 dark:bg-pink-950/30 dark:text-pink-400 dark:hover:bg-pink-950/50 transition-colors"
            >
              {t("shop-products")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
