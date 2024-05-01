import { parseISO, format } from "date-fns";

export default function useDateTimeComponent(
  dateString: string,
) {
  const parsedDate = parseISO(dateString);
  const day = format(parsedDate, "dd");
  const month = format(parsedDate, "MMM");
  return {day, month}
}
