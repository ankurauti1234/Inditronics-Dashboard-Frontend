"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialData = [
  {
    id: 1,
    meterId: "M001",
    config: "v1.0.0",
    updatedAt: "2023-04-01 10:00:00",
    updatedBy: "John Doe",
  },
  {
    id: 2,
    meterId: "M001",
    config: "v1.0.1",
    updatedAt: "2023-05-15 14:30:00",
    updatedBy: "Jane Smith",
  },
  {
    id: 3,
    meterId: "M002",
    config: "v1.0.0",
    updatedAt: "2023-03-20 09:00:00",
    updatedBy: "Alice Johnson",
  },
  {
    id: 4,
    meterId: "M002",
    config: "v1.0.1",
    updatedAt: "2023-06-01 16:45:00",
    updatedBy: "Bob Wilson",
  },
  {
    id: 5,
    meterId: "M003",
    config: "v1.0.0",
    updatedAt: "2023-02-10 11:20:00",
    updatedBy: "Carol Brown",
  },
  {
    id: 6,
    meterId: "M003",
    config: "v1.0.1",
    updatedAt: "2023-07-01 13:00:00",
    updatedBy: "David Lee",
  },
  {
    id: 7,
    meterId: "M004",
    config: "v1.0.0",
    updatedAt: "2023-01-01 08:00:00",
    updatedBy: "Emily Chen",
  },
  {
    id: 8,
    meterId: "M004",
    config: "v1.0.1",
    updatedAt: "2023-08-15 18:30:00",
    updatedBy: "Frank Kim",
  },
  {
    id: 9,
    meterId: "M005",
    config: "v1.0.0",
    updatedAt: "2023-05-01 12:00:00",
    updatedBy: "Grace Park",
  },
  {
    id: 10,
    meterId: "M005",
    config: "v1.0.1",
    updatedAt: "2023-09-30 19:45:00",
    updatedBy: "Henry Choi",
  },
];

const ConfigHistory = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      accessorKey: "meterId",
      header: "Meter ID",
    },
    {
      accessorKey: "config",
      header: "Config",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
    },
    {
      accessorKey: "updatedBy",
      header: "Updated By",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = () => {
    const filteredData = initialData.filter((item) =>
      item.meterId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  };

  return (
    <div className="w-full p-2 bg-background rounded-lg border">
      <div className="flex items-center mb-4">
        <Input
          placeholder="Search Meter ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-2"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ConfigHistory;
