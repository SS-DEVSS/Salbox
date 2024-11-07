import FastDelivery from "../assets/images/FastDelivery.png";
import FoodBalancedDiet from "../assets/images/FoodBalancedDiet.png";
import SavingsIcon from "../assets/images/SavingsIcon.png";
import PlanetEarthSustainability from "../assets/images/PlanetEarthSustainability.png";
import CustomerServiceIcon from "../assets/images/CustomerServiceIcon.png";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { CheckCircle2, ChevronDown, XCircle } from "lucide-react";

const data = [
  {
    image: FastDelivery,
    title: "Velocidad de Entrega",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "-30 min",
    competencia1: "40+ min",
    competencia2: "35+ min",
  },
  {
    image: FoodBalancedDiet,
    title: "Variedad de Platillos",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "check",
    competencia1: "--",
    competencia2: "--",
  },
  {
    image: SavingsIcon,
    title: "Costo",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "$180 pp",
    competencia1: "$280 pp",
    competencia2: "$250 pp",
  },
  {
    image: PlanetEarthSustainability,
    title: "Sostenibilidad",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "check",
    competencia1: "close",
    competencia2: "close",
  },
  {
    image: CustomerServiceIcon,
    title: "Atención al Cliente",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "check",
    competencia1: "close",
    competencia2: "close",
  },
];

export const columns = [
  {
    accessorKey: "title",
    cell: ({ row }: { row: any }) => {
      const { title, description } = row.original;
      return (
        <div className="flex items-center min-w-[200px] text-left">
          {/* <div className="mr-4">
            <ChevronDown />
          </div> */}
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-gray-500 mt-1">{description}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "salbox",
    header: "Salbox",
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("salbox");
      return (
        <div className="text-center flex justify-center p-2 py-4 text-white rounded-none">
          {value === "check" ? (
            <CheckCircle2 size={24} />
          ) : value === "close" ? (
            <XCircle size={24} />
          ) : (
            value
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "competencia1",
    header: "Competencia 1",
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("competencia1");
      return (
        <div className="text-center flex justify-center">
          {value === "check" ? (
            <CheckCircle2 size={24} />
          ) : value === "close" ? (
            <XCircle size={24} />
          ) : (
            value
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "competencia2",
    header: "Competencia 2",
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("competencia2");
      return (
        <div className="text-center flex justify-center">
          {value === "check" ? (
            <CheckCircle2 size={24} />
          ) : value === "close" ? (
            <XCircle size={24} />
          ) : (
            value
          )}
        </div>
      );
    },
  },
];

export default function MobileData() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full text-black">
      <div>
        <Table>
          <TableHeader className="bg-scarlet-100">
            <tr className="text-center">
              <th className="py-4 px-8 text-left"></th>
              <th className="py-4 px-8 bg-moonstone-400 text-white">Salbox</th>
              <th className="py-4 px-8">Competencia 1</th>
              <th className="py-4 px-8">Competencia 2</th>
            </tr>
          </TableHeader>
          <TableBody className="bg-white_smoke">
            {table.getRowModel().rows.map((row) => (
              <TableRow className="border-red-200" key={row.id}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cellIndex === 1
                        ? "bg-moonstone-400 text-white font-bold"
                        : ""
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
