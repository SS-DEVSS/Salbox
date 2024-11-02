import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

const data = [
  {
    salbox: "-30 min",
    competencia1: "40+ min",
    competencia2: "35+ min",
  },
  {
    salbox: "check",
    competencia1: "--",
    competencia2: "--",
  },
  {
    salbox: "$180 pp",
    competencia1: "$280 pp",
    competencia2: "$250 pp",
  },
  {
    salbox: "check",
    competencia1: "close",
    competencia2: "close",
  },
  {
    salbox: "check",
    competencia1: "close",
    competencia2: "close",
  },
];

export const columns = [
  {
    accessorKey: "salbox",
    header: "Salbox",
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("salbox");
      return (
        <div className="text-center flex justify-center p-2 py-4 rounded-none">
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

export function DataTableValues() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full h-full text-black">
      <div className="rounded-md rounded-bl-none border overflow-hidden">
        <Table>
          <TableHeader className="bg-white text-base">
            <tr>
              <th className="text-center py-4 bg-moonstone-400 text-white font-bold">
                Salbox
              </th>
              <th className="text-center py-4">Competencia 1</th>
              <th className="text-center py-4">Competencia 2</th>
            </tr>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => {
              const isLastRow = index === table.getRowModel().rows.length - 1;
              return (
                <TableRow
                  key={row.id}
                  className={`bg-white text-base ${
                    isLastRow ? "rounded-b-md" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cellIndex === 0
                          ? "bg-moonstone-400 text-white font-bold"
                          : ""
                      }
                    >
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
