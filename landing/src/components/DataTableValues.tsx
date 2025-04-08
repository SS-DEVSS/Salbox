import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

const data = [
  {
    SalboxGo: "En Ruta",
    competencia1: "30+ min",
    competencia2: "45+ min",
  },
  {
    SalboxGo: "Menos de $120 pp",
    competencia1: "+150 pp",
    competencia2: "+150 pp",
  },
  {
    SalboxGo: "Sin costo de Envío",
    competencia1: "+ $35",
    competencia2: "+ $45",
  },
  {
    SalboxGo: "Contenedores 100% Biodegradables",
    competencia1: "Contenedores PLA",
    competencia2: "Contenedores Unicel",
  },
  {
    SalboxGo: "100% personalizada",
    competencia1: "Intermediarios",
    competencia2: "Intermediarios",
  },
];

export const columns = [
  {
    accessorKey: "SalboxGo",
    header: "SalboxGo",
    cell: ({ row }: { row: any }) => {
      const value = row.getValue("SalboxGo");
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
                SalboxGo
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
                  className={`bg-white text-sm ${
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
