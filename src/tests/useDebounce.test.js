import React from "react";
import { render, act, cleanup,screen } from "@testing-library/react";
import useDebounce from "./../hooks/useDebounce";

// Mock the setTimeout and clearTimeout functions
jest.useFakeTimers();

describe("useDebounce", () => {
  afterEach(() => {
    jest.clearAllTimers();
    cleanup();
  });
  
  afterAll(() => {
    jest.useRealTimers();
  });

  test("should set the initial debounced value correctly", () => {
    const TestComponent = () => {
      const debouncedValue = useDebounce("initial value", 500);
      return <div>{debouncedValue}</div>;
    };
    render(<TestComponent/>)
    expect(screen.getByText("initial value")).toBeInTheDocument();
  });

  test("should update the debounced value after the specified delay", () => {
    const TestComponent = ({ value }) => {
      const debouncedValue = useDebounce(value, 500);
      return <div>{debouncedValue}</div>;
    };
    const { rerender } =render(<TestComponent value="initial value" />);
    expect(screen.getByText("initial value")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(700);
    });
    rerender(<TestComponent value="updated value" />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText("updated value")).toBeInTheDocument();
  });

  test("should not update the debounced value if a new value is set within the delay period", () => {
    const TestComponent = ({ value }) => {
      const debouncedValue = useDebounce(value, 1000);
      return <div>{debouncedValue}</div>;
    };

    const { rerender } = render(<TestComponent value="initial value" />);
    expect(screen.getByText("initial value")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1200);
    });
    rerender(<TestComponent value="updated value 1" />);
    expect(screen.getByText("initial value")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender(<TestComponent value="updated value 2" />);
    expect(screen.getByText("initial value")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1200);
    });
    expect(screen.getByText("updated value 2")).toBeInTheDocument();
  });

  test("should call clearTimeout when the component unmounts", () => {
    const mockClearTimeout = jest.spyOn(window, "clearTimeout");
    const TestComponent = ({ value }) => {
      const debouncedValue = useDebounce(value, 500);
      return <div>{debouncedValue}</div>;
    };

    const { unmount } = render(<TestComponent value="initial value" />);
    expect(mockClearTimeout).not.toHaveBeenCalled();

    unmount();
    expect(mockClearTimeout).toHaveBeenCalledTimes(1);
  });
});