import { notifyError } from "../utils/notification";

export const registerUser = async (data) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/user/`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    debugger;
    notifyError(error.message);
    return null;
  }
};
