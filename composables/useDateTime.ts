import { parseISO, format } from "date-fns";

export default function useDateTime(dateString: string): string | undefined {
  const parsedDate = parseISO(dateString);
  const date = format(parsedDate, "do MMM yyyy");
  const time = format(parsedDate, "h:mm a");
  return `last updated on ${date} at ${time}`;
}