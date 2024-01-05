// api.js
type Response = {
  data: null | {
    message?: string;
    error?: string;
  };
  status: number;
};
export const resetPass = async () => {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate different HTTP status codes
    const statusCode =
      Math.random() < 0.5
        ? 200
        : Math.random() < 0.3
        ? 400
        : Math.random() < 0.15
        ? 500
        : 502;
    const response: Response = {
      status: statusCode,
      data: null,
    };

    if (statusCode === 200) {
      response.data = { message: "Password reset successful" };
    } else if (statusCode === 400) {
      response.data = { error: "Invalid email" };
    } else if (statusCode === 500) {
      response.data = { error: "Internal server error" };
    } else if (statusCode === 502) {
      response.data = { error: "Bad gateway" };
    }

    return response;
  } catch (error) {
    return {
      status: 500,
      data: { error: "Internal server error" },
    };
  }
};
