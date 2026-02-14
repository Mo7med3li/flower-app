"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { occasions } from "@/lib/types/occasions";
import { getOccasions } from "@/lib/apis/occasions.api";
import { Input } from "@/components/ui/input";
import PaginationComponents from "@/components/common/Pagination-components";
import HeaderOccasionDashboard from "./header-occasion-dashboard";
import TableOccasionDashboard from "./table-occasion-dashboard";

export default function OccasionDashboard() {
  const [occasion, setOccasion] = useState<APIResponse<PaginatedResponse<occasions>>>();

  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") || 1);
  const nameParam = searchParams.get("search") ?? undefined;

  useEffect(() => {
    async function fetchData() {
      const response = await getOccasions({ limit: 10, page: pageParam, search: nameParam });
      setOccasion(response);
    }
    fetchData();
  }, [nameParam, pageParam]);

  if (occasion && "error" in occasion) {
    return <p>error while fetching data</p>;
  }
  return (
    <div className="flex flex-col gap-6">
      {/* occasions CRUD */}
      <section className="flex flex-col gap-5 p-6">
        {/* Header */}
        <HeaderOccasionDashboard />

        {/* Search */}
        <form action="occasions" method="get">
          <Input type="search" name="search" placeholder="Search" />
        </form>

        {/* Table */}
        <TableOccasionDashboard occasions={occasion?.occasions ?? []} />
      </section>

      {/*Pagination */}
      {occasion?.metadata && (
        <PaginationComponents metaData={occasion.metadata} />
      )}
    </div>
  );
}
