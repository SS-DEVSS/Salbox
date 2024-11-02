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

import { Table, TableBody, TableCell, TableRow } from "./ui/table";

const data = [
  {
    image: FastDelivery,
    title: "Velocidad de Entrega",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
  },
  {
    image: FoodBalancedDiet,
    title: "Variedad de Platillos",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
  },
  {
    image: SavingsIcon,
    title: "Costo",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
  },
  {
    image: PlanetEarthSustainability,
    title: "Sostenibilidad",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
  },
  {
    image: CustomerServiceIcon,
    title: "Atención al Cliente",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
  },
];

export const columns = [
  {
    accessorKey: "title",
    cell: ({ row }: { row: any }) => {
      const { image, title, description } = row.original;
      return (
        <div className="flex">
          <div className="mr-4 p-2 p-auto bg-scarlet-100 w-14 h-14 rounded-lg border">
            <img
              className="w-full h-full m-auto"
              src={image}
              alt={`${title} image`}
            />
          </div>
          <div>
            <div className="font-semibold text-xl text-left">{title}</div>
            <div className="text-base text-[#93909C] mt-1">{description}</div>
          </div>
        </div>
      );
    },
  },
];

export function DataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full mt-14 text-black">
      <div className="rounded-md border border-r-0 rounded-r-none overflow-hidden">
        <Table>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => {
              const isFirstRow = index === 0;
              const isLastRow = index === table.getRowModel().rows.length - 1;

              return (
                <TableRow
                  key={row.id}
                  className={`bg-white text-base ${
                    isFirstRow ? "rounded-t-md" : ""
                  } ${isLastRow ? "rounded-b-md" : ""}`}
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
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
