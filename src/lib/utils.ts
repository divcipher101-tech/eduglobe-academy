/**
 * EduGlobe Academy — Utility Functions
 * Shared helper functions used across the application.
 */

/**
 * Merge class names, filtering out falsy values.
 * A lightweight alternative to clsx/classnames.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a date to a human-readable string.
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  });
}

/**
 * Format a date to a relative time string (e.g., "2 hours ago").
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(d);
}

/**
 * Format a number as currency.
 */
export function formatCurrency(
  amount: number,
  currency: string = "GBP"
): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a large number with abbreviations (1.2K, 3.4M).
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

/**
 * Format duration in minutes to human-readable string.
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Generate a slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Get initials from a name (e.g., "John Doe" → "JD").
 */
export function getInitials(name: string, maxLength: number = 2): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, maxLength)
    .join("")
    .toUpperCase();
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Format an enum value for display (e.g., "IN_PROGRESS" → "In Progress").
 */
export function formatEnum(value: string): string {
  return value
    .split("_")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Generate a random color from a string (for avatars, etc.).
 */
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 65%, 55%)`;
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate a random invoice number.
 */
export function generateInvoiceNumber(): string {
  const prefix = "INV";
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${date}-${random}`;
}

/**
 * Calculate percentage.
 */
export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Delay execution (for loading states, etc.).
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse a search query string to extract params.
 */
export function parseSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") {
      result[key] = value;
    } else if (Array.isArray(value) && value.length > 0) {
      result[key] = value[0];
    }
  }
  return result;
}

/**
 * Determine a grade from a percentage score.
 */
export function getGrade(percentage: number): string {
  if (percentage >= 90) return "A*";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  if (percentage >= 40) return "E";
  return "U";
}

/**
 * Get grade color for UI display.
 */
export function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    "A*": "var(--success-500)",
    A: "var(--success-500)",
    B: "var(--secondary-500)",
    C: "var(--info-500)",
    D: "var(--warning-500)",
    E: "var(--accent-500)",
    U: "var(--danger-500)",
  };
  return colors[grade] || "var(--gray-500)";
}
