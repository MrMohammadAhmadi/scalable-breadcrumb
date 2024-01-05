// YourComponent.test.js
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { resetPass } from "./api/apis";
import App from "./App";

jest.mock("./api/apis");
const mockResetPass = resetPass as jest.MockedFunction<typeof resetPass>;

describe("YourComponent", () => {
  it("should display success message on successful password reset", async () => {
    mockResetPass.mockResolvedValue({
      status: 200,
      data: { message: "Password reset successful" },
    });

    const component = render(<App />);

    const button = await component.getByText("click");
    fireEvent.click(button);

    await waitFor(() => expect(mockResetPass).toHaveBeenCalledTimes(1));

    const result = component.getByText("Password reset successful");
    expect(result).toBeInTheDocument();
  });

  it("should display success message on faild password reset", async () => {
    mockResetPass.mockResolvedValue({
      status: 400,
      data: { message: "bad request" },
    });

    const component = render(<App />);

    const button = await component.getByText("click");
    fireEvent.click(button);

    await waitFor(() => expect(mockResetPass).toHaveBeenCalledTimes(2));

    const result = component.getByText("bad request");
    expect(result).toBeInTheDocument();
  });
});
