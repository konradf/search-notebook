import React from 'react';
import { Link, List, ListItem, ListItemText, Paper, Tooltip, Typography } from '@material-ui/core';
import { formatDistance } from '../libs/dateHelpers';

interface ResultsProps {
  results: Array<any>;
}
export const Results = ({ results }: ResultsProps) => (
  <Paper variant="outlined">
    <List>
      {results.map(({ title, author, url, points, created_at, _tags }) => (
        <ListItem divider>
          <ListItemText disableTypography>
            <Tooltip arrow title={`Tags: ${_tags.join(', ')}`} placement="right">
              <Typography component="span">{title}</Typography>
            </Tooltip>
            <Typography color="textSecondary">
              <strong>{points}</strong> points, author: {author}, {formatDistance(created_at)}
            </Typography>
            <Typography>
              <Link target="_blank" rel="noreferrer" href={url} variant="body2">
                {url}
              </Link>
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </Paper>
);
