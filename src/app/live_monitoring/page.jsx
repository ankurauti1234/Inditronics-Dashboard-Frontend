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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MainLayout from "@/components/layouts/MainLayout";
import APMLocations from "@/components/charts/APMLocations";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const data = [
  {
    deviceId: "100001",
    hhId: "HH001",
    hhStatus: "active",
    logoDetection: "NBC",
    logoImage: "https://via.placeholder.com/50x50.png?text=NBC",
    audioFingerprint: "ABC",
    audioImage: "https://via.placeholder.com/50x50.png?text=ABC",
    finalOutput: "NBC",
    finalImage: "https://via.placeholder.com/50x50.png?text=NBC",
  },
  {
    deviceId: "100002",
    hhId: "HH002",
    hhStatus: "inactive",
    logoDetection: "HBO",
    logoImage: "https://via.placeholder.com/50x50.png?text=HBO",
    audioFingerprint: "HBO",
    audioImage: "https://via.placeholder.com/50x50.png?text=HBO",
    finalOutput: "HBO",
    finalImage: "https://via.placeholder.com/50x50.png?text=HBO",
  },
  {
    deviceId: "100003",
    hhId: "HH003",
    hhStatus: "active",
    logoDetection: "CBS",
    logoImage: "https://via.placeholder.com/50x50.png?text=CBS",
    audioFingerprint: "CBS",
    audioImage: "https://via.placeholder.com/50x50.png?text=CBS",
    finalOutput: "CBS",
    finalImage: "https://via.placeholder.com/50x50.png?text=CBS",
  },
  {
    deviceId: "100004",
    hhId: "HH004",
    hhStatus: "active",
    logoDetection: "FOX",
    logoImage: "https://via.placeholder.com/50x50.png?text=FOX",
    audioFingerprint: "FOX",
    audioImage: "https://via.placeholder.com/50x50.png?text=FOX",
    finalOutput: "FOX",
    finalImage: "https://via.placeholder.com/50x50.png?text=FOX",
  },
  {
    deviceId: "100005",
    hhId: "HH005",
    hhStatus: "inactive",
    logoDetection: "ESPN",
    logoImage: "https://via.placeholder.com/50x50.png?text=ESPN",
    audioFingerprint: "ESPN",
    audioImage: "https://via.placeholder.com/50x50.png?text=ESPN",
    finalOutput: "ESPN",
    finalImage: "https://via.placeholder.com/50x50.png?text=ESPN",
  },
  {
    deviceId: "100006",
    hhId: "HH006",
    hhStatus: "active",
    logoDetection: "CNN",
    logoImage: "https://via.placeholder.com/50x50.png?text=CNN",
    audioFingerprint: "CNN",
    audioImage: "https://via.placeholder.com/50x50.png?text=CNN",
    finalOutput: "CNN",
    finalImage: "https://via.placeholder.com/50x50.png?text=CNN",
  },
  {
    deviceId: "100007",
    hhId: "HH007",
    hhStatus: "active",
    logoDetection: "MSNBC",
    logoImage: "https://via.placeholder.com/50x50.png?text=MSNBC",
    audioFingerprint: "MSNBC",
    audioImage: "https://via.placeholder.com/50x50.png?text=MSNBC",
    finalOutput: "MSNBC",
    finalImage: "https://via.placeholder.com/50x50.png?text=MSNBC",
  },
  {
    deviceId: "100008",
    hhId: "HH008",
    hhStatus: "inactive",
    logoDetection: "Disney",
    logoImage: "https://via.placeholder.com/50x50.png?text=Disney",
    audioFingerprint: "Disney",
    audioImage: "https://via.placeholder.com/50x50.png?text=Disney",
    finalOutput: "Disney",
    finalImage: "https://via.placeholder.com/50x50.png?text=Disney",
  },
  {
    deviceId: "100009",
    hhId: "HH009",
    hhStatus: "active",
    logoDetection: "Nickelodeon",
    logoImage: "https://via.placeholder.com/50x50.png?text=Nick",
    audioFingerprint: "Nickelodeon",
    audioImage: "https://via.placeholder.com/50x50.png?text=Nick",
    finalOutput: "Nickelodeon",
    finalImage: "https://via.placeholder.com/50x50.png?text=Nick",
  },
  {
    deviceId: "100010",
    hhId: "HH010",
    hhStatus: "active",
    logoDetection: "TNT",
    logoImage: "https://via.placeholder.com/50x50.png?text=TNT",
    audioFingerprint: "TNT",
    audioImage: "https://via.placeholder.com/50x50.png?text=TNT",
    finalOutput: "TNT",
    finalImage: "https://via.placeholder.com/50x50.png?text=TNT",
  },
];

const ChannelInfo = ({ name, image }) => (
  <Dialog>
    <DialogTrigger>
      <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
        <Image src={image} alt={name} width={24} height={24} className="rounded" />
        <span>{name}</span>
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{name} Channel Information</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center space-y-4">
        <Image src={image} alt={name} width={200} height={200} className="rounded" />
        <p>Channel Name: {name}</p>
        <p>Additional information about {name} can be added here.</p>
      </div>
    </DialogContent>
  </Dialog>
);

export const columns = [
  {
    accessorKey: "deviceId",
    header: "Device ID",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div 
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => router.push(`/livemonitoring/${row.getValue("deviceId")}`)}
        >
          {row.getValue("deviceId")}
        </div>
      );
    },
  },
  {
    accessorKey: "hhId",
    header: "HH ID",
    cell: ({ row }) => <div>{row.getValue("hhId")}</div>,
  },
  {
    accessorKey: "hhStatus",
    header: "HH Status",
    cell: ({ row }) => {
      const status = row.getValue("hhStatus");
      return (
        <div className={`capitalize font-semibold ${
          status === "active" ? "text-green-500" : "text-red-500"
        }`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "logoDetection",
    header: "Logo Detection",
    cell: ({ row }) => (
      <ChannelInfo name={row.getValue("logoDetection")} image={row.original.logoImage} />
    ),
  },
  {
    accessorKey: "audioFingerprint",
    header: "Audio Fingerprint",
    cell: ({ row }) => (
      <ChannelInfo name={row.getValue("audioFingerprint")} image={row.original.audioImage} />
    ),
  },
  {
    accessorKey: "finalOutput",
    header: "Final Output",
    cell: ({ row }) => (
      <ChannelInfo name={row.getValue("finalOutput")} image={row.original.finalImage} />
    ),
  },
];

function Page() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
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

  const handleSearch = () => {
    table.getColumn("deviceId")?.setFilterValue(searchTerm);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <h1 className="text-2xl font-bold">Live Monitoring</h1>
        <div className="w-full p-2 bg-secondary rounded-lg">
          <div className="flex items-center py-2 ">
            <Input
              placeholder="Search Device ID..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="max-w-sm"
            />
            <Button className="ml-2" onClick={handleSearch}>Search</Button>
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
          <div className="rounded-md border z-0 bg-card">
                <ScrollArea className="h-[45vh]">
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
              </ScrollArea>
          </div>
        </div>
        {/* <div className="w-full ">
          <APMLocations />
        </div> */}
      </div>
    </MainLayout>
  );
}

export default Page;
