import axios from "axios"

// const isBrowser = () => typeof window !== "undefined"

export const tokenTitle = "token"
const baseURL = `https://dbkala.bauctf.ir/api`

const axiosDefaultConfigs = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json"
  }
}

const createAxiosConfig = (axiosDefaultConfig) => {

  // if (isBrowser()) {
  //   const token = window.localStorage.getItem(tokenTitle)
  //
  //   if (token) {
  //     return {
  //       ...axiosDefaultConfig,
  //       headers: {
  //         ...axiosDefaultConfig.headers,
  //
  //       }
  //     }
  //   }
  // }


  return { ...axiosDefaultConfig }
}

const axiosInstance = axios.create(createAxiosConfig(axiosDefaultConfigs))

axiosInstance.interceptors.request.use(function(config) {
  // What to do before sending the request
  // Write a value to bypass if judgment
  if (config.method === "get") {
    config.data = true
  }
  return config
}, function(error) {
  // What to do about request errors
  return Promise.reject(error)
})

export default axiosInstance
