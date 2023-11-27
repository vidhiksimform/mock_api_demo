import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoWrapper from "../components/TodoWrapper";
import { server } from "../mocks/server";
import { rest } from "msw";
import { getApiUrl } from "../utils";

describe("Todo component", () => {
  it("should render Todo component correctly", () => {
    render(<TodoWrapper />);
    const element = screen.getByRole("heading", {
      name: /Get Things Done !/i,
      level: 1,
    });
    expect(element).toBeInTheDocument();
  });

  it("display todo list", async () => {
    render(<TodoWrapper />);
    const todo = await screen.findAllByRole("listitem");
    await waitFor(() => {
      expect(todo).toHaveLength(3);
      expect(screen.getByText(/coffee/i)).toBeInTheDocument();
      expect(screen.getByText(/javascript/i)).toBeInTheDocument();
      expect(screen.getByText(/cook/i)).toBeInTheDocument();
    });
  });

  it("input todo and check todo is displayed in the list", async () => {
    render(<TodoWrapper />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "ideas" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add todo/i }));
    await waitFor(() => {
      expect(screen.getByText(/ideas/i)).toBeInTheDocument();
    });
  });

  it("Should handle API's network error and show error message", async () => {
    server.use(
      rest.get(getApiUrl("posts"), (_, res, ctx) => {
        return res(ctx.status(500), ctx.json({}));
      })
    );
    render(<TodoWrapper />);
    const error = await screen.findByText(/Error fetching todos/i);
    expect(error).toBeInTheDocument();
  });
});
