import { parseISO, format } from "date-fns";

export default function useDateTimeComponent(dateString: string) {
  const parsedDate = parseISO(dateString);
  const day = format(parsedDate, "dd");
  const month = format(parsedDate, "MMM");
  const year = format(parsedDate, "yy");
  return { day, month, year };
}
