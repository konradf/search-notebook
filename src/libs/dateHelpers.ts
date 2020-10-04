import { format, formatDistanceToNow, parseJSON } from 'date-fns';

const getCurrentDateString = () => new Date().toISOString();
const formatDateString = (dateString: string) => format(parseJSON(dateString), 'yyyy-MM-dd');
const formatDistance = (dateString: string) => formatDistanceToNow(parseJSON(dateString), { addSuffix: true });

export { getCurrentDateString, formatDateString, formatDistance };
