import axiosInstance from "../axiosConfig"

export const getSearch = async (query) => await axiosInstance.get(`/search?name=${query}`)