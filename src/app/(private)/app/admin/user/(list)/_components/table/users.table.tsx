"use client";

import { GridRowsProp } from "@mui/x-data-grid";
import { useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomDataGrid from "@/app/_components/datagrid";
import columns from "./users.column";
import { useGetuserList } from "@/lib/actions/user/list.get";

export default function UsersTable() {
  const router = useRouter();
  const { data, isLoading } = useGetuserList();
  console.log(data);
  const rows: GridRowsProp = useMemo(() => data?.data?.data || [], [data]);
  const pagination: {
    count: number;
  } = useMemo(() => {
    if (data?.data?.count !== undefined) {
    }
    return {
      count: data?.data?.count || 0,
    };
  }, [data]);

  return (
    <div className="min-h-96 w-full">
      <CustomDataGrid
        columns={columns}
        rows={rows}
        loading={isLoading}
        rowCount={pagination?.count || 0}
        getRowId={(row) => row._id}
        // paginationMeta={{
        //   hasNextPage: !!pagination?.next,
        // }}
        // paginationModel={{
        //   page: page - 1,
        //   pageSize: 10,
        // }}
        // onPaginationModelChange={(model) => {
        //   setPage(model.page + 1);
        // }}
        onRowDoubleClick={(row) => router.push(`/users/${row.id}`)}
      />
    </div>
  );
}