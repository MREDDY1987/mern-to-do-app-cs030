  import { render, screen, fireEvent } from "@testing-library/react";
  import App from "./App";

  test("renders the todo input", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/add/i)).toBeInTheDocument();
  });

  test("adds a new todo when typed and submitted", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add/i);
    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  test("deletes a todo", () => {
    render(<App />);
    // ...add one, click its delete button, assert it's gone
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
  });