import {
  act,
  fireEvent,
  render,
} from "@testing-library/react";
import React from "react";
import FeedbackForm from "../components/FeedbackForm/FeedbackForm";

describe("FeedbackForm", () => {
  describe("with valid inputs", () => {
    it("calls onSubmit function", async () => {
        jest.mock('react-hook-form', () => ({
            ...jest.requireActual('react-hook-form'),
            Controller: () => <></>,
            useForm: () => ({
              register: () => jest.fn(),
            }),
          }))
      const mockOnSubmit = jest.fn();
      const { getByPlaceholderText, getByTestId } = render(
        <FeedbackForm onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        fireEvent.change(getByPlaceholderText("name"), {
          target: { value: "Resul" },
        });
        fireEvent.change(getByPlaceholderText("email"), {
          target: { value: "resul@frakton.com" },
        });
        fireEvent.change(getByPlaceholderText("rating"), {
          target: { value: 4 },
        });
        fireEvent.change(getByPlaceholderText("comment"), {
          target: { value: "this is a test comment" },
        });
      });
      act(async () => {
        fireEvent.submit(getByTestId("submit-button"));
      });
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
  describe("with invalid name", () => {
    it.todo("renders the name validation error");
  });
  describe("with invalid email", () => {
    it.todo("renders the email validation error");
  });
  describe("with invalid rating", () => {
    it.todo("renders the rating validation error");
  });
});
