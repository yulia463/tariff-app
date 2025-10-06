import React from "react";
import { render, screen } from "@testing-library/react";
import HeaderTimer from "../HeaderTimer";

describe("HeaderTimer", () => {
    test("рендерится с дефолтными значениями", () => {
        render(<HeaderTimer />);
        expect(screen.getByText("Успейте открыть пробную неделю")).toBeInTheDocument();
    });

    test("цвет таймера меняется при малом оставшемся времени", () => {
        render(<HeaderTimer startSeconds={120} />);
        const timer = screen.getByText(/:/);
        expect(timer).toBeInTheDocument();
    });

    test("совпадает со snapshot", () => {
        const { asFragment } = render(<HeaderTimer startSeconds={960} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
