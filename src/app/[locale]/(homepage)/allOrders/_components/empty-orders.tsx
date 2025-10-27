"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const EmptyOrders = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 p-6">
      {/* Icon Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="p-6 bg-muted/40 dark:bg-muted/10 rounded-2xl"
      >
        <ShoppingBag className="w-14 h-14 text-muted-foreground" />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {t("there-are-no-orders-yet")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("orders-empty")}</p>
      </motion.div>

      {/* Button Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Button
          onClick={() => (window.location.href = "/products")}
          className="rounded-2xl mt-4 px-6"
        >
          {t("browse-products")}
        </Button>
      </motion.div>
    </div>
  );
};

export default EmptyOrders;
