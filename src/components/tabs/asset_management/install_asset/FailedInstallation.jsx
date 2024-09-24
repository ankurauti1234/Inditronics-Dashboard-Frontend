"use client";
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    MeterId: "10001",
    HHId: "HH001",
    TVId: "TV1234",
    RemoteId: "R001",
    MeterInstallationStatus: "Failed",
    RemoteInstallationStatus: "Failed",
    InstallationInitiatedAt: "2024-03-15 10:00:00",
  },
  {
    MeterId: "10002",
    HHId: "HH002",
    TVId: "TV5678",
    RemoteId: "R002",
    MeterInstallationStatus: "Failed",
    RemoteInstallationStatus: "Failed",
    InstallationInitiatedAt: "2024-03-16 11:00:00",
  },
  // ...
];

const columns = [
  {
    accessorKey: "MeterId",
    header: "Device Id",
  },
  {
    accessorKey: "HHId",
    header: "HH Id",
  },
  {
    accessorKey: "TVId",
    header: "TV Id",
  },
  {
    accessorKey: "RemoteId",
    header: "Remote Id",
  },
  {
    accessorKey: "MeterInstallationStatus",
    header: "Meter Installation Status",
  },
  {
    accessorKey: "RemoteInstallationStatus",
    header: "Remote Installation Status",
  },
  {
    accessorKey: "InstallationInitiatedAt",
    header: "Installation Initiated At",
  },
];

export default function FailedInstallationComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    const filtered = data.filter((item) =>
      item.MeterId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full p-2 bg-background rounded-lg border">
      <div className="flex items-center mb-2">
        <Input
          placeholder="Search Meter Id..."
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
}
