import axios from 'axios';
import {message} from "antd";
import {getToken} from "../utils/utils";

export const client = axios.create(
    {
        baseURL: "/api/",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
);

// 添加请求拦截器
client.interceptors.request.use(function (config) {

    config.headers.token = getToken()

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
client.interceptors.response.use(function (response) {
    if (response.data.status) {
        return response.data.data;
    }
    // 特殊处理
    if (!response.config.url.endsWith("fetchCurrentUser") && !response.data.status) {
        message.error("请求返回错误: " + response.data.message)
    }
    return Promise.reject(response);
}, function (error) {
    // 对响应错误做点什么
    const {response} = error;
    // console.log(error, response)
    if (response && response.data && response.data.status === false) {
        message.error(response.data.message)
    } else {
        message.error(`请求时出现异常, HTTP状态码: ${response.status}, ${response.statusText}`)
    }
    return Promise.reject(response);
});
