import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "./ui/table";

// Sample data
const data = [
  {
    image: "path_to_delivery_icon",
    title: "Velocidad de Entrega",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "-30 min",
    competencia1: "40+ min",
    competencia2: "35+ min",
  },
  {
    image: "path_to_dishes_icon",
    title: "Variedad de Platillos",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "✔",
    competencia1: "--",
    competencia2: "--",
  },
  {
    image: "path_to_cost_icon",
    title: "Costo",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "$180 pp",
    competencia1: "$280 pp",
    competencia2: "$250 pp",
  },
  {
    image: "path_to_sustainability_icon",
    title: "Sostenibilidad",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "✔",
    competencia1: "✖",
    competencia2: "✖",
  },
  {
    image: "path_to_customer_service_icon",
    title: "Atención al Cliente",
    description: "Etiam non maximus ipsum, at ullamcorper nibh.",
    salbox: "✔",
    competencia1: "✖",
    competencia2: "✖",
  },
];

// Column definition
export const columns = [
  {
    accessorKey: "title",
    cell: ({ row }: { row: any }) => {
      const { image, title, description } = row.original;
      return (
        <div className="flex">
          <div className="mr-4 bg-scarlet-100 w-14 h-14 rounded-lg border">
            <img className="w-8 h-8" src={image} alt={`${title} image`} />
          </div>
          <div>
            <div className="font-semibold text-xl text-left">{title}</div>
            <div className="text-base text-[#93909C]">{description}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "salbox",
    header: "Salbox",
    cell: ({ row }: { row: any }) => (
      <div className="text-center">{row.getValue("salbox")}</div>
    ),
  },
  {
    accessorKey: "competencia1",
    header: "Competencia 1",
    cell: ({ row }: { row: any }) => (
      <div className="text-center">{row.getValue("competencia1")}</div>
    ),
  },
  {
    accessorKey: "competencia2",
    header: "Competencia 2",
    cell: ({ row }: { row: any }) => (
      <div className="text-center">{row.getValue("competencia2")}</div>
    ),
  },
];

export function DataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-[1400px] mx-auto text-black">
      <div className="rounded-md border">
        <Table>
          <thead>
            <tr>
              {/* Title and description header */}
              <th className="text-left" colSpan={1}></th>
              {/* Competitors' header */}
              <th className="text-center">Salbox</th>
              <th className="text-center">Competencia 1</th>
              <th className="text-center">Competencia 2</th>
            </tr>
          </thead>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => {
              const isLastRow = index - 1 === table.getRowModel().rows.length;
              return (
                <TableRow
                  key={row.id}
                  className="bg-white"
                  style={{
                    borderBottomLeftRadius: isLastRow ? "12px !important" : "0",
                    borderBottomRightRadius: isLastRow
                      ? "12px !important"
                      : "0",
                  }}
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
