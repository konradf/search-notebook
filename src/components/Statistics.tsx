import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { SearchQuery } from '../types';
import { getQueries } from '../libs/storage';
import { getQueriesSummary } from '../libs/query';

export const Statistics: React.FunctionComponent = () => {
  const [queries] = React.useState<SearchQuery[]>(getQueries());
  const summary = getQueriesSummary(queries);

  console.log(Object.keys(summary));
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Query</TableCell>
            <TableCell align="right">Average hits for last day</TableCell>
            <TableCell align="right">Average hits for last week</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(summary).map((query) => (
            <TableRow key={query}>
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
