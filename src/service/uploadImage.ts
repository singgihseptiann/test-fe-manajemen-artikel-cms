import axios from "axios";

export const uploadImage = async (endpoint: string, data: FormData) => {
  const token = localStorage.getItem("user_token");
  if (!token) throw new Error("Token tidak ditemukan di localStorage");

  const response = await axios.post(
    `https://test-fe.mysellerpintar.com/api/${endpoint}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
