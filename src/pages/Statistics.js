
import React, { useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
} from "@mui/material";

export default function Statistics() {
  // Mock stats
  const [stats] = useState([
    {
      short: "http://localhost:3000/abc123",
      clicks: 5,
      created: "2025-09-18",
      expiry: "2025-09-18 12:00",
    },
    {
      short: "http://localhost:3000/xyz789",
      clicks: 2,
      created: "2025-09-18",
      expiry: "2025-09-18 12:30",
    },
  ]);

  return (
    <Card elevation={4} sx={{ p: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          📊 URL Statistics
        </Typography>
        <Paper sx={{ mt: 2, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Short URL</b></TableCell>
                <TableCell><b>Clicks</b></TableCell>
                <TableCell><b>Created</b></TableCell>
                <TableCell><b>Expiry</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((s, i) => (
                <TableRow key={i}>
                  <TableCell>{s.short}</TableCell>
                  <TableCell>{s.clicks}</TableCell>
                  <TableCell>{s.created}</TableCell>
                  <TableCell>{s.expiry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </CardContent>
    </Card>
  );
}
