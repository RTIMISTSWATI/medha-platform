// ADDED
import { MOTIVATION_QUOTES } from "../constants/motivationQuotes";

const STORAGE_KEY = "medhaQuote";
const FALLBACK    = "Every expert was once a beginner. Keep going. 🚀";

export function getDailyQuote() {
  try {
    const today = new Date().toDateString(); // e.g. "Mon Jun 09 2025"

    // Return cached quote if it belongs to today
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.date === today && typeof parsed?.quote === "string") {
        return parsed.quote;
      }
    }

    // Pick a deterministic quote based on the date (not random on reload)
    const dayIndex = new Date().getDate() + new Date().getMonth() * 31;
    const quote = MOTIVATION_QUOTES[dayIndex % MOTIVATION_QUOTES.length];

    // Cache for the rest of the day
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, quote }));
    return quote;
  } catch {
    // SAFETY: never crash even if localStorage is blocked or JSON is corrupt
    return FALLBACK;
  }
}
