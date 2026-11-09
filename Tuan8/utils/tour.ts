import type { Tour } from "../components/TourItem";

export interface TourSection {
  title: string;
  data: Tour[];
}

export function groupByCity(tours: Tour[]): TourSection[] {
  const map = new Map<string, Tour[]>();
  for (const tour of tours) {
    const list = map.get(tour.city);
    if (list) list.push(tour);
    else map.set(tour.city, [tour]);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b, "vi"))
    .map(([title, data]) => ({
      title,
      data: [...data].sort((a, b) => a.departure.localeCompare(b.departure)),
    }));
}

export function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function getSeatLabel(seats: number): string {
  if (seats === 0) return "Hết chỗ";
  if (seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
}

export function formatPrice(price: number): string {
  return `${String(Math.round(price)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫`;
}
