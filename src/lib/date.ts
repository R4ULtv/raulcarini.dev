const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const compactDateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const monthLabelFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

export function formatFullDate(date: Date): string {
  return fullDateFormatter.format(date);
}

export function formatCompactDate(date: Date): string {
  return compactDateFormatter.format(date);
}

export function formatMonthLabel(date: Date): string {
  return monthLabelFormatter.format(date);
}
