import {
  format,
  formatDistanceToNow,
  isThisYear,
  differenceInDays,
} from "date-fns";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Calculate the difference in days between the given date and the current date
  const daysDifference = differenceInDays(new Date(), date);

  // If the date is within 7 days, show the time ago format
  if (daysDifference < 7) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  // If the date is within this year, show the format "dd MMMM"
  if (isThisYear(date)) {
    return format(date, "dd MMM");
  }

  // Otherwise, show the full date format "dd MMMM yyyy"
  return format(date, "dd MMMM yyyy");
};
