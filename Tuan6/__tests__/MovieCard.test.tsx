import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MovieCard, { Movie } from "../components/MovieCard";

const movie: Movie = {
  id: "1",
  title: "Gone Nutty",
  genre: "Comedy",
  year: 1990,
  rating: 8,
  poster: "http://dummyimage.com/300x400.png",
  isShowing: true,
};

describe("MovieCard - render", () => {
  it("hiển thị đúng tên phim và điểm đánh giá (8 -> ⭐ 8.0)", async () => {
    const { getByText } = await render(
      <MovieCard movie={movie} onSelect={jest.fn()} />,
    );
    expect(getByText("Gone Nutty")).toBeTruthy();
    expect(getByText("⭐ 8.0")).toBeTruthy();
  });
});

describe("MovieCard - layout", () => {
  it('layout="row" hiển thị thể loại', async () => {
    const { queryByText } = await render(
      <MovieCard movie={movie} layout="row" onSelect={jest.fn()} />,
    );
    expect(queryByText("Comedy")).not.toBeNull();
  });

  it('layout="tile" không hiển thị thể loại', async () => {
    const { queryByText } = await render(
      <MovieCard movie={movie} layout="tile" onSelect={jest.fn()} />,
    );
    expect(queryByText("Comedy")).toBeNull();
  });
});

describe("MovieCard - trạng thái", () => {
  it("isShowing: true hiển thị ✅", async () => {
    const { queryByText } = await render(
      <MovieCard movie={{ ...movie, isShowing: true }} onSelect={jest.fn()} />,
    );
    expect(queryByText("✅")).not.toBeNull();
    expect(queryByText("❌")).toBeNull();
  });

  it("isShowing: false hiển thị ❌", async () => {
    const { queryByText } = await render(
      <MovieCard movie={{ ...movie, isShowing: false }} onSelect={jest.fn()} />,
    );
    expect(queryByText("❌")).not.toBeNull();
    expect(queryByText("✅")).toBeNull();
  });
});

describe("MovieCard - sự kiện", () => {
  it("nhấn thẻ: onSelect được gọi đúng 1 lần với movie.id", async () => {
    const onSelect = jest.fn();
    const { getByText } = await render(
      <MovieCard movie={movie} onSelect={onSelect} />,
    );

    await fireEvent.press(getByText("Gone Nutty"));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith("1");
  });
});
