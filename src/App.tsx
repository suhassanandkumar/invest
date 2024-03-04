import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface RowData {
  [key: string | number]: string | number;
}

function createTableRowData(data: (string | number)[], columns: string[]) {
  const rowData: RowData = {};
  data.forEach((val, i) => {
    rowData[columns[i]] = val;
  });
  return rowData;
}

function App() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(
      "api/v3/datasets/WIKI/FB.json?api_key=oX-Y6j65RxjZyhA-Vnqi&start_date=2014-01-01&end_date=2014-03-31"
    )
      .then((response) => response.json())
      .then((actualData) => {
        const columns = actualData?.dataset?.column_names;
        setColumns(columns);
        const data = actualData?.dataset?.data;
        const rows = data.map((val: (string | number)[]) => {
          return createTableRowData(val, columns);
        });
        setRows(rows);
        console.log(rows);
      });
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Invhistory
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell align={i > 0 ? "right" : undefined}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowData) => (
              <TableRow
                key={row.Date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {(Object.keys(row) as (keyof typeof row)[]).map((rowVal, i) => (
                  <TableCell align={i > 0 ? "right" : undefined}>
                    {row[rowVal]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default App;
