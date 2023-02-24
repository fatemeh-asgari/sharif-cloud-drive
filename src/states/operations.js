import { notifyError } from "../utils/notification";

export const registerUser = async (data) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/user/`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.username);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};

export const loginUser = async (data) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/login/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token 326606550b631b994927a0ed385309db8fe66160",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.detail);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};
