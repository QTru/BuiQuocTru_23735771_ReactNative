import { groupByCity, formatDate, getSeatLabel } from "../utils/tour";
import type { Tour } from "../components/TourItem";

const makeTour = (overrides: Partial<Tour>): Tour => ({
  id: "1",
  name: "Tour mẫu",
  city: "Hà Nội",
  days: 3,
  price: 3590000,
  seats: 10,
  departure: "2026-11-05",
  image: "https://example.com/a.jpg",
  isFavorite: false,
  ...overrides,
});

const tours: Tour[] = [
  makeTour({ id: "1", city: "Nha Trang", departure: "2026-12-01" }),
  makeTour({ id: "2", city: "Đà Lạt", departure: "2026-12-20" }),
  makeTour({ id: "3", city: "Hà Nội", departure: "2026-11-15" }),
  makeTour({ id: "4", city: "Đà Lạt", departure: "2026-11-05" }),
  makeTour({ id: "5", city: "Đà Lạt", departure: "2026-11-30" }),
];

describe("groupByCity", () => {
  const sections = groupByCity(tours);

  it("trả về đúng số nhóm", () => {
    expect(sections).toHaveLength(3);
  });

  it("sắp xếp tên thành phố A → Z", () => {
    expect(sections.map((s) => s.title)).toEqual([
      "Đà Lạt",
      "Hà Nội",
      "Nha Trang",
    ]);
  });

  it("sắp xếp tour trong nhóm theo departure tăng dần", () => {
    const daLat = sections.find((s) => s.title === "Đà Lạt")!;
    expect(daLat.data.map((t) => t.departure)).toEqual([
      "2026-11-05",
      "2026-11-30",
      "2026-12-20",
    ]);
  });
});

describe("formatDate", () => {
  it("đổi YYYY-MM-DD sang DD/MM/YYYY", () => {
    expect(formatDate("2026-11-05")).toBe("05/11/2026");
  });
});

describe("getSeatLabel", () => {
  it("giá trị biên 0, 3, 4", () => {
    expect(getSeatLabel(0)).toBe("Hết chỗ");
    expect(getSeatLabel(3)).toBe("Chỉ còn 3 chỗ");
    expect(getSeatLabel(4)).toBe("Còn 4 chỗ");
  });
});
