import { notifyError } from "../utils/notification";

export const registerUser = async (data) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/user/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
        Authorization: "token 21a97871ab521e72c998671c1222f23868f05df2",
        "Content-Type": "application/json"
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

export const logoutUser = async (token) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/logout/`;
    const response = await fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        Authorization: "token 21a97871ab521e72c998671c1222f23868f05df2",
        "Content-Type": "application/json",
        "User-Token": token,
      },
    });
    if (!response.ok) {
      throw new Error("server error");
    }
    const responseText = await response.text();
    return responseText;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};
