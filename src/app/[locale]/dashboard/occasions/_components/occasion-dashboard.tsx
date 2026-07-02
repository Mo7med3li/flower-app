"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { occasions } from "@/lib/types/occasions";
import { getOccasions } from "@/lib/apis/occasions.api";
import { Input } from "@/components/ui/input";
import PaginationComponent from "@/components/common/Pagination-components";
import { APIResponse, PaginatedResponse } from "@/lib/types/api";
import HeaderOccasionDashboard from "./header-occasion-dashboard";
import TableOccasionDashboard from "./table-occasion-dashboard";

export default function OccasionDashboard() {
  const [occasion, setOccasion] = useState<APIResponse<PaginatedResponse<occasions>>>();

  const searchParams = useSearchParams();
  const nameParam = searchParams.get("search") ?? undefined; // phone

  useEffect(() => {
    async function fetchData() {
      const response = await getOccasions({ limit: 10, page: 1 });
      if (!response.status) {
        return;
      }
      setOccasion(response);
    }
    fetchData();
  }, [nameParam]);

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
        <TableOccasionDashboard occasions={occasion?.payload?.data ?? []} />
      </section>

      {/*Pagination */}
      <PaginationComponent metaData={occasion?.payload?.metadata ?? undefined} />
    </div>
  );
}
