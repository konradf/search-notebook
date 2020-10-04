import * as React from 'react';
import { Chip, Link, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { formatDistance } from '../libs/dateHelpers';
import { getQueries } from '../libs/storage';
import { getQueryById } from '../libs/query';
import { SearchQuery, SearchResult } from '../types';

interface ResultProps {
  result: SearchResult;
}

export const Result: React.FunctionComponent<ResultProps> = ({ result, children }) => {
  const { title, author, url, points, created_at, tags, query_id } = result;

  const [queries] = React.useState<SearchQuery[]>(getQueries());
  const query = query_id ? getQueryById(query_id, queries)?.query_string : null;

  return (
    <ListItem divider>
      <ListItemText disableTypography>
        <Tooltip arrow title={`Tags: ${tags?.join(', ')}`} placement="right">
          <Typography component="span">{title}</Typography>
        </Tooltip>
        {query && <Chip label={query} />}

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
