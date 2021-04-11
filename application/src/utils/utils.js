export const formatTime = (string) => string.split("T").join(" ").substring(0, 19);

export function getToken() {
    return localStorage.getItem("token")
}

export function setToken(token) {
    return localStorage.setItem("token", token)
}



export const format = (data) => Object.keys(data).map(i => encodeURIComponent(i) + '=' + encodeURIComponent(data[i])).join('&');
