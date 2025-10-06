import React from "react";
import { render, screen } from "@testing-library/react";
import HeaderTimer from "../HeaderTimer";

describe("HeaderTimer", () => {
    test("renders with default values", () => {
        render(<HeaderTimer />);
        expect(screen.getByText("Успейте открыть пробную неделю")).toBeInTheDocument();
    });

    test("changes timer color when time is low", () => {
        render(<HeaderTimer startSeconds={120} />);
        const timer = screen.getByText(/:/);
        expect(timer).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<HeaderTimer startSeconds={960} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
