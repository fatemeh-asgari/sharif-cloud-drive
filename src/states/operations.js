import { notifyError } from "../utils/notification";

export const registerUser = async (data) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/user/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        Authorization: "token dab904cda801c0fcfdd1ebe25600646ffdd90bc3",
        "Content-Type": "application/json",
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
      mode: "cors",
      headers: {
        Authorization: "token dab904cda801c0fcfdd1ebe25600646ffdd90bc3",
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

export const createLibrary = async (data, token) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/library/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token dab904cda801c0fcfdd1ebe25600646ffdd90bc3",
        "Content-Type": "application/json",
        "User-Token": token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Create library failed!");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};

export const fetchLibraries = async (token) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/library/`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "token dab904cda801c0fcfdd1ebe25600646ffdd90bc3",
        "Content-Type": "application/json",
        "User-Token": token,
      },
    });
    if (!response.ok) {
      throw new Error("Fetch libraries failed!");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};

export const createFile = async (formData, token) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/file/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token dab904cda801c0fcfdd1ebe25600646ffdd90bc3",
        // "Content-Type": "application/json",
        "User-Token": token,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Create file failed!");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};

export const createAttachment = async (formData, token) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/attachment/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "token dab904cda801c0fcfdd1ebe25600646ffdd90bc3",
        // "Content-Type": "application/json",
        "User-Token": token,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Create attachment failed!");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};

export const fetchFiles = async (token, libraryId) => {
  try {
    const url = `http://127.0.0.1:8000/api/v1/file/?library=${libraryId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "token dab904cda801c0fcfdd1ebe25600646ffdd90bc3",
        "Content-Type": "application/json",
        "User-Token": token,
      },
    });
    if (!response.ok) {
      throw new Error("Fetch files failed!");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    notifyError(error.message);
    return null;
  }
};
