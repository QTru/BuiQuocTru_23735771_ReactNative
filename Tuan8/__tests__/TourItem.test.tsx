import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TourItem, { Tour } from "../components/TourItem";

const tour: Tour = {
  id: "7",
  name: "Đà Lạt mộng mơ",
  city: "Đà Lạt",
  days: 3,
  price: 3590000,
  seats: 2,
  departure: "2026-11-05",
  image: "https://example.com/a.jpg",
  isFavorite: false,
};

describe("TourItem - bố cục", () => {
  it("compact: không hiển thị thành phố", async () => {
    const { queryByText } = await render(
      <TourItem tour={tour} compact onPress={jest.fn()} onToggleFavorite={jest.fn()} />,
    );
    expect(queryByText("Đà Lạt")).toBeNull();
  });

  it("không compact: có hiển thị thành phố", async () => {
    const { queryByText } = await render(
      <TourItem tour={tour} onPress={jest.fn()} onToggleFavorite={jest.fn()} />,
    );
    expect(queryByText("Đà Lạt")).not.toBeNull();
  });
});

describe("TourItem - sự kiện", () => {
  it("nhấn tim: gọi onToggleFavorite(id, true) 1 lần, không gọi onPress", async () => {
    const onPress = jest.fn();
    const onToggleFavorite = jest.fn();
    const { getByTestId } = await render(
      <TourItem tour={tour} onPress={onPress} onToggleFavorite={onToggleFavorite} />,
    );

    await fireEvent.press(getByTestId("fav-btn"));

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onToggleFavorite).toHaveBeenCalledWith("7", true);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("nhấn tên tour: gọi onPress với cả object tour", async () => {
    const onPress = jest.fn();
    const { getByText } = await render(
      <TourItem tour={tour} onPress={onPress} onToggleFavorite={jest.fn()} />,
    );

    await fireEvent.press(getByText("Đà Lạt mộng mơ"));

    expect(onPress).toHaveBeenCalledWith(tour);
  });
});
