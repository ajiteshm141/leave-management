import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postRequest = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.post(url, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error as any);
    throw error; // Rethrow the error to handle it in React components
  }
};

export const getRequest = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<any> => {
  try {
    const response: AxiosResponse = await instance.get(url, config);
    return response.data;
  } catch (error) {
    handleApiError(error as any);
    throw error;
  }
};

export const deleteRequest = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<void> => {
  try {
    await instance.delete(url, config);
  } catch (error) {
    handleApiError(error as any);
    throw error;
  }
};

export const handleApiError = (error: AxiosError<any>) => {
  if (error.response) {
    console.error("API response error:", error.response.data);
  } else if (error.request) {
    console.error("API request error:", error.request);
  } else {
    console.error("API error:", error.message);
  }
};
