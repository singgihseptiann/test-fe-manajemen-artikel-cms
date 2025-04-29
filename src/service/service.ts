import { apiServices } from "./base.url";

const api = {
  // getById: async (endpoint: string, id: string) => {},
  getById: async (endpoint: string, id: string) => {
    try {
      const response = await apiServices.get(`${endpoint}/${id}`); // Endpoint dengan ID langsung di URL
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Fungsi GET untuk mengambil data, dengan params opsional
  get: async (endpoint: string, params: { [key: string]: any } = {}) => {
    try {
      const response = await apiServices.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fungsi POST untuk mengirimkan data
  post: async (endpoint: string, data: any) => {
    try {
      const token = localStorage.getItem("user_token"); // Ambil token dari localStorage
      const response = await apiServices.post(endpoint, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // Jika token ada, sertakan di header
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fungsi PUT untuk memperbarui data
  put: async (endpoint: string, id: string, data: any) => {
    try {
      const token = localStorage.getItem("user_token"); // Ambil token dari localStorage
      const response = await apiServices.put(`${endpoint}/${id}`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // Sertakan token jika ada
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fungsi DELETE untuk menghapus data
  delete: async (endpoint: string, id: string) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await apiServices.delete(`${endpoint}/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // Jika token ada, sertakan di header
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  postImg: async (endpoint: string, data: FormData) => {
    try {
      const token = localStorage.getItem("user_token");
      const response = await apiServices.post(endpoint, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // ✅ FIXED HERE
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
