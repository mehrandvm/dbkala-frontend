import axiosInstance from "../axiosConfig"

export const getLaptops = async (query) => await axiosInstance.get(`/laptops?name=${query}`)