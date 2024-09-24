"use client";

import * as React from "react";
import { Filter, ChevronDown, Ellipsis } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MainLayout from "@/components/layouts/MainLayout";
import APMLocations from "@/components/maps/APMLocations";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Update the data structure with new fields
const data = [
  {
    meterId: "100001",
    status: "online",
    connectivityStatus: "connected",
    householdId: "HH1",
    householdStatus: "active",
    hardwareVersion: "v1.2.3",
    network: "SIM1",
    location: "Maharashtra",
    latLon: "40.7128° N, 74.0060° W",
  },
  {
    meterId: "100002",
    status: "offline",
    connectivityStatus: "disconnected",
    householdId: "HH2",
    householdStatus: "inactive",
    hardwareVersion: "v1.2.3",
    network: "SIM2",
    location: "Maharashtra",
    latLon: "34.0522° N, 118.2437° W",
  },
  // Add more data entries as needed
  {
    meterId: "100003",
    status: "online",
    connectivityStatus: "connected",
    householdId: "HH3",
    householdStatus: "active",
    hardwareVersion: "v1.2.4",
    network: "SIM1",
    location: "Maharashtra",
    latLon: "37.7749° N, 122.4194° W",
  },
  {
    meterId: "100004",
    status: "offline",
    connectivityStatus: "disconnected",
    householdId: "HH4",
    householdStatus: "inactive",
    hardwareVersion: "v1.2.5",
    network: "SIM2",
    location: "Maharashtra",
    latLon: "51.5074° N, 0.1278° W",
  },
  {
    meterId: "100005",
    status: "online",
    connectivityStatus: "connected",
    householdId: "HH5",
    householdStatus: "active",
    hardwareVersion: "v1.2.6",
    network: "SIM1",
    location: "Maharashtra",
    latLon: "48.8566° N, 2.3522° E",
  },
];

// Update the column definitions with new fields
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "meterId",
    header: "Device ID",
    cell: ({ row }) => <div>{row.getValue("meterId")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "connectivityStatus",
    header: "Connectivity Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("connectivityStatus")}</div>
    ),
  },
  {
    accessorKey: "householdId",
    header: "Household ID",
    cell: ({ row }) => <div>{row.getValue("householdId")}</div>,
  },
  {
    accessorKey: "householdStatus",
    header: "Household Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("householdStatus")}</div>
    ),
  },
  {
    accessorKey: "hardwareVersion",
    header: "Hardware Version",
    cell: ({ row }) => <div>{row.getValue("hardwareVersion")}</div>,
  },
  {
    accessorKey: "network",
    header: "Network",
    cell: ({ row }) => <div>{row.getValue("network")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "latLon",
    header: "Lat & Lon",
    cell: ({ row }) => <div>{row.getValue("latLon")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const meter = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(meter.meterId)}
            >
              Copy Meter ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function Meter() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (<div className="flex items-center justify-center h-full">
      <div
        className={cn(
          "w-16 h-16 border-4 border-dashed rounded-full animate-spin",
          "border-gray-400 border-t-transparent"
        )}
      ></div>
    </div>)

  }

  return (
    <div className="w-full p-2 bg-background rounded-lg border">
      <div className="flex items-center mb-2">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Filter Meters..."
            value={table.getColumn("meterId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("meterId")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Search Filters <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Card>
                <CardHeader>
                  <CardTitle>Apply filters</CardTitle>
                  <CardDescription>
                    Use filters to further refine search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="raspberry juice"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="manufacturer">Manufacturer</Label>
                      <Input
                        type="text"
                        id="manufacturer"
                        placeholder="cadbery"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="date">Date of Entry</Label>
                      <Input type="date" id="date" />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dispatched">
                            Dispatched Out
                          </SelectItem>
                          <SelectItem value="in-warehouse">
                            In Warehouse
                          </SelectItem>
                          <SelectItem value="bringing-in">
                            Being Brought In
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                  <Button variant="outline">Reset</Button>
                  <Button>Search</Button>
                </CardFooter>
              </Card>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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

export default Meter;
