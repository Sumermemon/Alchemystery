/**
 * Date formatting utilities for consistent display across the application.
 * Uses Intl.DateTimeFormat for locale-aware formatting without adding
 * a date library dependency.
 */

/** Formats a date string as "19 September 2026" */
export function formatDisplayDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
}

/** Formats a date string as "Sep 2026" — for compact displays */
export function formatMonthYear(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

/** Returns an ISO date string from a Date object — useful for datetime attributes */
export function toISODateString(date: Date = new Date()): string {
  return date.toISOString();
}
