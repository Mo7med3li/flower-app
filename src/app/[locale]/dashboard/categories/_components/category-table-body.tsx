import React from "react";
import { useTranslations } from "next-intl";
import { CategoryType } from "@/lib/types/category";
import { TableCell, TableRow } from "@/components/ui/table";
import TableBtnActions from "./actions";

export default function CategoryTableBody({ category }: { category: CategoryType }) {
  const t = useTranslations();
  return (
    <TableRow className=" px-5 hover:bg-maroon-50 dark:hover:bg-soft-pink-300 ">
      <TableCell className="font-mediu w-[200px]" colSpan={1}>
        {category.title}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {category._count.products} <span>{t("products-0")}</span>
        </div>
      </TableCell>
      <TableCell className="flex gap-3 justify-end">
        {/* Btns actions */}
        <TableBtnActions id={category.id} name={category.title} />
      </TableCell>
    </TableRow>
  );
}
