"use client";
// import { applyFilterFn, FilterPopover } from "@/app/components/src";
import React, { useState, useMemo } from "react";
import { FilterPopover, applyFilterFn } from "@ankamala/ui-libraries/filter";

const MOCK_DATA = [
  { name: "Alice",   status: "active",   role: "Admin",  amount: 120, isActive: true,  createdAt: "2024-01-15" },
  { name: "Bob",     status: "inactive", role: "User",   amount: 85,  isActive: false, createdAt: "2024-02-20" },
  { name: "Carol",   status: "pending",  role: "Editor", amount: 200, isActive: true,  createdAt: "2024-03-10" },
  { name: "Dave",    status: "active",   role: "User",   amount: 55,  isActive: false, createdAt: "2024-04-05" },
  { name: "Eve",     status: "active",   role: "Admin",  amount: 310, isActive: true,  createdAt: "2024-05-18" },
  { name: "Frank",   status: "pending",  role: "Editor", amount: 90,  isActive: false, createdAt: "2024-06-22" },
  { name: "Grace",   status: "inactive", role: "User",   amount: 175, isActive: true,  createdAt: "2024-07-30" },
  { name: "Hank",    status: "active",   role: "Admin",  amount: 400, isActive: true,  createdAt: "2024-08-11" },
];

const FILTER_DATA = {
  fields: [
    { path: "name",      label: "Name"       },
    { path: "status",    label: "Status"     },
    { path: "role",      label: "Role"       },
    { path: "amount",    label: "Amount"     },
    { path: "isActive",  label: "Is Active"  },
    { path: "createdAt", label: "Created At" },
  ],
  types: {
    name:      "string",
    status:    "select",
    role:      "select",
    amount:    "number",
    isActive:  "boolean",
    createdAt: "date",
  },
};

const KEYS_META = {
  name:      { label: "Name",       type: "string"  },
  status:    { label: "Status",     type: "select",  multiple: false },
  role:      { label: "Role",       type: "select",  multiple: true  },
  amount:    { label: "Amount",     type: "number"  },
  isActive:  { label: "Is Active",  type: "boolean" },
  createdAt: { label: "Created At", type: "date"    },
};

const OPTIONS = {
  status: [
    { path: "active",   label: "Active"   },
    { path: "inactive", label: "Inactive" },
    { path: "pending",  label: "Pending"  },
  ],
  role: [
    { path: "Admin",  label: "Admin"  },
    { path: "Editor", label: "Editor" },
    { path: "User",   label: "User"   },
  ],
};

const STATUS_COLORS = {
  active:   "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-700",
  pending:  "bg-yellow-100 text-yellow-700",
};

export default function FilterTestPage() {
  const [filters, setFilters] = useState(null);

  const filteredData = useMemo(() => {
  if (!filters) return MOCK_DATA;
  return applyFilterFn(MOCK_DATA, filters);
}, [filters]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Filter Popover Test</h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing {filteredData.length} of {MOCK_DATA.length} rows
            {filters && (
              <button
                onClick={() => setFilters(null)}
                className="ml-3 text-primary-600 hover:underline"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>

        <FilterPopover
          filterData={FILTER_DATA}
          options={OPTIONS}
          keysMeta={KEYS_META}
          filters={filters}
          updateFilters={setFilters}
          defaultCondition={{
            key: "amount",
            operator: "<=",
            value: 200,
          }}
        />
      </div>

      {/* Results table */}
      <div className="border border-slate-200 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {["Name", "Status", "Role", "Amount", "Is Active", "Created At"].map(col => (
                <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <tr key={i} className="bg-white hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.role}</td>
                  <td className="px-4 py-3 text-slate-600">${row.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {row.isActive ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                  No results match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Raw filter output */}
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
          Active filter (backend format)
        </p>
        <pre className="bg-slate-100 rounded p-4 text-xs overflow-auto text-slate-700">
          {JSON.stringify(filters, null, 2) || "null — no filters applied yet"}
        </pre>
      </div>
    </div>
  );
}