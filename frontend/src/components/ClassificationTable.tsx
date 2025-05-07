// src/components/TablaClasificacion.tsx
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface Clasificacion {
  posicion: number;
  bot: string;  // Cambié 'bot' por 'nombre' según tu uso anterior
  puntos: number;
  V?: number;
  E?: number;
  D?: number;
}

interface Props {
  data: Clasificacion[];
}

export default function TablaClasificacion({ data }: Props) {
  return (
    <Table className="tabla-clasificacion">
      <TableHead>
        <TableRow>
        <TableCell>Posición</TableCell>
            <TableCell>Bot</TableCell>
            <TableCell>Puntos</TableCell>
            <TableCell>V</TableCell>
            <TableCell>E</TableCell>
            <TableCell>D</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.posicion}>
             <TableCell>{row.posicion}</TableCell>
              <TableCell>{row.bot}</TableCell>
              <TableCell>{row.puntos}</TableCell>
              <TableCell>{row.V ?? "-"}</TableCell>
              <TableCell>{row.E ?? "-"}</TableCell>
              <TableCell>{row.D ?? "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
