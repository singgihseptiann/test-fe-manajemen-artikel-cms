import { userAuthBaseUrl } from "./base.url";

const userAuth = {
  post: async (endpoint: string, data: any) => {
    try {
      const response = await userAuthBaseUrl.post(endpoint, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  get: async (endpoint: string) => {
    try {
      const token = localStorage.getItem("user_token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await userAuthBaseUrl.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userAuth;
