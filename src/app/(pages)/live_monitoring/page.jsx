"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/layouts/MainLayout";
import dynamic from "next/dynamic";

const LiveMonitorMap = dynamic(
  () => import("@/components/maps/LiveMonitorMap"),
  {
    ssr: false, // This will disable server-side rendering for this component
  }
);
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";

const data = [
  {
    meterId: "100001",
    householdId: "HH001",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.1",
    lastChannelWatched: "NBC",
    lastConnectedNetwork: "WiFi",
    currentSwVersion: "v3.5",
    installationLocation: "Living Room",
    batteryStatus: "85%",
    lastSynced: "2024-09-13 10:30 AM",
    sim1: "active",
    sim2: "inactive",
    lat: 40.7128,
    lon: -74.006,
    confidence: 85,
  },
  {
    meterId: "100002",
    householdId: "HH002",
    status: "offline",
    householdStatus: "inactive",
    hwVersion: "v2.0",
    lastChannelWatched: "CBS",
    lastConnectedNetwork: "4G",
    currentSwVersion: "v3.4",
    installationLocation: "Bedroom",
    batteryStatus: "32%",
    lastSynced: "2024-09-12 09:15 PM",
    sim1: "inactive",
    sim2: "active",
    lat: 34.0522,
    lon: -118.2437,
    confidence: 72,
  },
  {
    meterId: "100003",
    householdId: "HH003",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.2",
    lastChannelWatched: "ABC",
    lastConnectedNetwork: "WiFi",
    currentSwVersion: "v3.5",
    installationLocation: "Kitchen",
    batteryStatus: "92%",
    lastSynced: "2024-09-13 11:45 AM",
    sim1: "active",
    sim2: "active",
    lat: 37.7749,
    lon: -122.4194,
    confidence: 90,
  },
  {
    meterId: "100004",
    householdId: "HH004",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.1",
    lastChannelWatched: "FOX",
    lastConnectedNetwork: "5G",
    currentSwVersion: "v3.5",
    installationLocation: "Living Room",
    batteryStatus: "78%",
    lastSynced: "2024-09-13 10:00 AM",
    sim1: "active",
    sim2: "inactive",
    lat: 33.4484,
    lon: -112.074,
    confidence: 88,
  },
  {
    meterId: "100005",
    householdId: "HH005",
    status: "offline",
    householdStatus: "inactive",
    hwVersion: "v2.0",
    lastChannelWatched: "ESPN",
    lastConnectedNetwork: "3G",
    currentSwVersion: "v3.3",
    installationLocation: "Bedroom",
    batteryStatus: "15%",
    lastSynced: "2024-09-11 08:30 PM",
    sim1: "inactive",
    sim2: "inactive",
    lat: 38.8951,
    lon: -77.0364,
    confidence: 65,
  },
  {
    meterId: "100006",
    householdId: "HH006",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.2",
    lastChannelWatched: "CNN",
    lastConnectedNetwork: "WiFi",
    currentSwVersion: "v3.5",
    installationLocation: "Office",
    batteryStatus: "89%",
    lastSynced: "2024-09-13 11:15 AM",
    sim1: "active",
    sim2: "active",
    lat: 38.9072,
    lon: -77.0369,
    confidence: 92,
  },
  {
    meterId: "100007",
    householdId: "HH007",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.1",
    lastChannelWatched: "MSNBC",
    lastConnectedNetwork: "4G",
    currentSwVersion: "v3.5",
    installationLocation: "Living Room",
    batteryStatus: "72%",
    lastSynced: "2024-09-13 09:45 AM",
    sim1: "active",
    sim2: "inactive",
    lat: 38.9072,
    lon: -77.0369,
    confidence: 78,
  },
  {
    meterId: "100008",
    householdId: "HH008",
    status: "offline",
    householdStatus: "inactive",
    hwVersion: "v2.0",
    lastChannelWatched: "Disney",
    lastConnectedNetwork: "WiFi",
    currentSwVersion: "v3.4",
    installationLocation: "Kids Room",
    batteryStatus: "45%",
    lastSynced: "2024-09-12 07:30 PM",
    sim1: "inactive",
    sim2: "active",
    lat: 34.0522,
    lon: -118.2437,
    confidence: 70,
  },
  {
    meterId: "100009",
    householdId: "HH009",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.2",
    lastChannelWatched: "Nickelodeon",
    lastConnectedNetwork: "5G",
    currentSwVersion: "v3.5",
    installationLocation: "Playroom",
    batteryStatus: "95%",
    lastSynced: "2024-09-13 11:30 AM",
    sim1: "active",
    sim2: "active",
    lat: 37.7749,
    lon: -122.4194,
    confidence: 94,
  },
  {
    meterId: "100010",
    householdId: "HH010",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.1",
    lastChannelWatched: "TNT",
    lastConnectedNetwork: "WiFi",
    currentSwVersion: "v3.5",
    installationLocation: "Basement",
    batteryStatus: "81%",
    lastSynced: "2024-09-13 10:15 AM",
    sim1: "active",
    sim2: "inactive",
    lat: 33.4484,
    lon: -112.074,
    confidence: 86,
  },
  // New data entries
  {
    meterId: "100011",
    householdId: "HH011",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.2",
    lastChannelWatched: "HBO",
    lastConnectedNetwork: "5G",
    currentSwVersion: "v3.5",
    installationLocation: "Master Bedroom",
    batteryStatus: "88%",
    lastSynced: "2024-09-13 12:00 PM",
    sim1: "active",
    sim2: "active",
    lat: 40.7128,
    lon: -74.006,
    confidence: 91,
  },
  {
    meterId: "100012",
    householdId: "HH012",
    status: "offline",
    householdStatus: "inactive",
    hwVersion: "v2.1",
    lastChannelWatched: "Showtime",
    lastConnectedNetwork: "3G",
    currentSwVersion: "v3.4",
    installationLocation: "Guest Room",
    batteryStatus: "22%",
    lastSynced: "2024-09-12 06:45 PM",
    sim1: "inactive",
    sim2: "inactive",
    lat: 34.0522,
    lon: -118.2437,
    confidence: 60,
  },
  {
    meterId: "100013",
    householdId: "HH013",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.2",
    lastChannelWatched: "Discovery",
    lastConnectedNetwork: "WiFi",
    currentSwVersion: "v3.5",
    installationLocation: "Study",
    batteryStatus: "97%",
    lastSynced: "2024-09-13 11:55 AM",
    sim1: "active",
    sim2: "active",
    lat: 37.7749,
    lon: -122.4194,
    confidence: 95,
  },
  {
    meterId: "100014",
    householdId: "HH014",
    status: "online",
    householdStatus: "active",
    hwVersion: "v2.1",
    lastChannelWatched: "History",
    lastConnectedNetwork: "4G",
    currentSwVersion: "v3.5",
    installationLocation: "Den",
    batteryStatus: "76%",
    lastSynced: "2024-09-13 10:30 AM",
    sim1: "active",
    sim2: "inactive",
    lat: 33.4484,
    lon: -112.074,
    confidence: 82,
  },
  {
    meterId: "100015",
    householdId: "HH015",
    status: "offline",
    householdStatus: "inactive",
    hwVersion: "v2.0",
    lastChannelWatched: "Cartoon Network",
    lastConnectedNetwork: "WiFi",
    currentSwVersion: "v3.3",
    installationLocation: "Playroom",
    batteryStatus: "35%",
    lastSynced: "2024-09-12 08:15 PM",
    sim1: "inactive",
    sim2: "active",
    lat: 38.8951,
    lon: -77.0364,
    confidence: 68,
  },
];

const ChannelDialog = ({ channel, confidence }) => (
  <Dialog>
    <DialogTrigger asChild>
      <div className="flex items-center space-x-2 cursor-pointer rounded-lg bg-background font-semibold  border hover:border-primary p-1 hover:scale-105 transition-all duration-300">
        <Image
          src={`/placeholder.svg?height=30&width=30`}
          alt={channel}
          width={30}
          height={30}
          className="rounded bg-black"
        />
        <span>{channel}</span>
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{channel} Viewing Confidence</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={`/placeholder.svg?height=100&width=100`}
          alt={channel}
          width={100}
          height={100}
          className="rounded"
        />
        <RadialBarChart
          width={300}
          height={300}
          cx={150}
          cy={150}
          innerRadius={100}
          outerRadius={140}
          barSize={80}
          data={[{ name: "Confidence", value: confidence }]}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#4fe54f" }}
            background
            clockWise
            dataKey="value"
          />
        </RadialBarChart>
      </div>
    </DialogContent>
  </Dialog>
);

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant={status === "online" ? "default" : "destructive"}
          className={`h-3 w-3 p-0 ${status === "online" ? "bg-green-500" : ""}`}
        ></Badge>
      );
    },
  },
  {
    accessorKey: "meterId",
    header: "Meter ID",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <button
          className="text-foreground bg-background hover:underline cursor-pointer flex items-center rounded-xl border px-2 transition-all duration-300 ease-in-out group relative"
          onClick={() =>
            router.push(`/live_monitoring/${row.getValue("meterId")}`)
          }
        >
          <span className="flex items-center">{row.getValue("meterId")}</span>
          <ChevronRight
            className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
            size={16}
          />
        </button>
      );
    },
  },
  {
    accessorKey: "householdId",
    header: "Household ID",
  },
  {
    accessorKey: "householdStatus",
    header: "Household Status",
    cell: ({ row }) => {
      const status = row.getValue("householdStatus");
      return (
        <Badge
          variant={status === "active" ? "Secondary" : "Secondary"}
          className={` ${
            status === "active"
              ? "border border-green-500 bg-green-200 dark:bg-green-500/25"
              : "border border-gray-500 bg-muted"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastChannelWatched",
    header: "Last Channel Watched",
    cell: ({ row }) => (
      <ChannelDialog
        channel={row.getValue("lastChannelWatched")}
        confidence={row.original.confidence}
      />
    ),
  },
  { accessorKey: "lastConnectedNetwork", header: "Last Connected Network" },
  { accessorKey: "hwVersion", header: "H/W Version" },
  { accessorKey: "currentSwVersion", header: "Current S/W Version" },
  { accessorKey: "installationLocation", header: "Installation Location" },
  { accessorKey: "batteryStatus", header: "Battery Status" },
  { accessorKey: "lastSynced", header: "Last Synced" },
  {
    accessorKey: "sim1",
    header: "SIM 1",
    cell: ({ row }) => {
      const status = row.getValue("sim1");
      return (
        <Badge
          variant={status === "active" ? "Secondary" : "Secondary"}
          className={` ${
            status === "active"
              ? "border border-green-500 bg-green-200 dark:bg-green-500/25"
              : "border border-gray-500 bg-muted"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "sim2",
    header: "SIM 2",
    cell: ({ row }) => {
      const status = row.getValue("sim2");
      return (
        <Badge
          variant={status === "active" ? "Secondary" : "Secondary"}
          className={` ${
            status === "active"
              ? "border border-green-500 bg-green-200 dark:bg-green-500/25"
              : "border border-gray-500 bg-muted"
          }`}
        >
          {status}
        </Badge>
      );
    },
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
    table.getColumn("meterId")?.setFilterValue(searchTerm);
  };

  const filteredDevices = table
    .getFilteredRowModel()
    .rows.map((row) => row.original);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className={cn(
            "w-16 h-16 border-4 border-dashed rounded-full animate-spin",
            "border-gray-400 border-t-transparent"
          )}
        ></div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-1 flex-col gap-4">
        <h1 className="text-2xl font-bold">Live Monitoring</h1>
        <div className="w-full p-2 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border ">
          <LiveMonitorMap devices={filteredDevices} />
        </div>
        <div className="w-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 shadow-inner shadow-accent/50 border p-2 rounded-lg">
          <div className="flex items-center mb-2 ">
            <Input
              placeholder="Search Meter ID..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="max-w-sm"
            />
            <Button className="ml-2" onClick={handleSearch}>
              Search
            </Button>
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
      </div>
    </MainLayout>
  );
}

export default Page;
