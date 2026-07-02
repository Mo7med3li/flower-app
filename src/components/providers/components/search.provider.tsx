"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { getAllCategories } from "@/app/[locale]/dashboard/categories/_apis/all-categories";
import { CategoryType } from "@/lib/types/category";

type CategoryContextType = {
  searchCategoryList: CategoryType[];
  setSearchCategoryList: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  // eslint-disable-next-line no-unused-vars
  searchCategory: (searchValue: string) => Promise<CategoryType[]>;
  searchValue: string | null;
  setSearchValue: React.Dispatch<React.SetStateAction<string | null>>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  // state
  const [searchCategoryList, setSearchCategoryList] = useState<CategoryType[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  // functions
  async function searchCategory(searchValue: string): Promise<CategoryType[]> {
    const payload = await getAllCategories();

    const filteredCategories = payload.payload?.data.filter((category: CategoryType) =>
      category.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setSearchCategoryList(filteredCategories || []);

    return filteredCategories || [];
  }

  return (
    <CategoryContext.Provider
      value={{
        searchCategoryList,
        setSearchCategoryList,
        searchCategory,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useContextContext must be used within an Category Provider");
  }
  return context;
};
