import { format, formatDistanceToNow, getUnixTime, parseJSON } from 'date-fns';

const getCurrentDateString = () => new Date().toISOString();
const formatDateString = (dateString: string) => format(parseJSON(dateString), 'yyyy-MM-dd');
const formatDistance = (dateString: string) => formatDistanceToNow(parseJSON(dateString), { addSuffix: true });
const getTimestamp = (dateString: string) => getUnixTime(parseJSON(dateString));

export { getCurrentDateString, formatDateString, formatDistance, getTimestamp };
