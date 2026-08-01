import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import type { ReactNode } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

export function DataTable<T>({ columns, rows }: { columns: Column<T>[]; rows: T[] }) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return asc ? cmp : -cmp;
    });
  }, [rows, sortKey, asc]);

  return (
    <div className="overflow-x-auto">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c.key}>
                  <button
                    className="flex items-center gap-1 hover:text-foreground"
                    onClick={() => {
                      if (sortKey === c.key) setAsc((v) => !v);
                      else {
                        setSortKey(c.key);
                        setAsc(true);
                      }
                    }}
                  >
                    {c.label}
                    <ArrowUpDown className="size-3 opacity-50" />
                  </button>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((row, i) => (
              <TableRow key={i}>
                {columns.map((c) => (
                  <TableCell key={c.key}>
                    {c.render
                      ? c.render(row)
                      : String((row as Record<string, unknown>)[c.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
