import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { getQueries } from '../libs/storage';
import { getQueriesSummary } from '../libs/query';
import { SearchQuery } from '../types';

export const Statistics: React.FunctionComponent = () => {
  const [queries] = React.useState<SearchQuery[]>(getQueries());
  const summary = getQueriesSummary(queries);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="statistics">
        <TableHead>
          <TableRow>
            <TableCell>Query</TableCell>
            <TableCell align="right">Average hits last day</TableCell>
            <TableCell align="right">Average hits last week</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(summary).map((query) => (
            <TableRow key={query} hover>
              <TableCell component="th" scope="row">
                {query}
              </TableCell>
              <TableCell align="right">{Math.round(summary[query].day.total / summary[query].day.count)}</TableCell>
              <TableCell align="right">{Math.round(summary[query].week.total / summary[query].week.count)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
