import React from 'react';
import { formatDistance } from '../libs/dateHelpers';
import { Link, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { SearchResult } from '../types';

interface ResultProps {
  result: SearchResult;
}

export const Result: React.FunctionComponent<ResultProps> = ({ result, children }) => {
  const { id, title, author, url, points, created_at, tags } = result;

  return (
    <ListItem divider key={id}>
      <ListItemText disableTypography>
        <Tooltip arrow title={`Tags: ${tags?.join(', ')}`} placement="right">
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
      {children}
    </ListItem>
  );
};
