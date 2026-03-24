"use client"
import React from "react";
import { DataTable } from "@ankamala/table/table";

export default function Demo() {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ getValue }) => (
        <div className="font-medium text-slate-900">{getValue()}</div>
      ),
    },
    {
      accessorKey: 'completeness',
      header: 'Completeness',
      cell: ({ getValue }) => (
        <div className="text-slate-600">{getValue()}</div>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ getValue }) => (
        <div className="text-slate-600">{getValue()}</div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ getValue }) => {
        const gender = getValue();
        if (!gender) return null;

        const genderColorMap = {
          male: "bg-primary-100 text-primary-700",
          female: "bg-pink-100 text-pink-700",
          other: "bg-purple-100 text-purple-700",
        };

        const color = genderColorMap[gender] || "bg-gray-100 text-gray-600";

        return (
          <span className={`inline-flex px-3 py-1 rounded-sm text-xs font-medium capitalize ${color}`}>
            {gender}
          </span>
        );
      },
    },
  ];

  const peopleFilterConfig = {
    fields: [
      { label: "Gender", path: "gender", type: "select" },
      { label: "Title", path: "title", type: "select" },
      { label: "Name", path: "name", type: "string" },
      { label: "Completeness", path: "completeness", type: "number" },
    ],
    defaultCondition: {
      key: "completeness",
      operator: "<=",
      value: "0.5",
    },
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <DataTable 
          data="http://172.235.34.72:8000/data/b1d8d46c9539ddf076c44e85493f6347/more/people"
          columns={columns}
          enableSorting
          enablePagination
          enableSearch
          enableFilter
          searchPlaceholder="Search people..."
          filterConfig={peopleFilterConfig} 
          tableTitle="People Directory"
          tableSubtitle="View people records"
          pageSize={10}
          onRowClick={(row) => console.log('Clicked:', row)}
        />
      </div>
    </div>
  );
}