let serveUrl = import.meta.env.MODE == "production" ? "http://49.235.119.92:8080/" : "/api";
export const postConfig = {
    url: "",
    baseURL: serveUrl,
    headers:{
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    timeout: 5000
}

export const getConfig = {
    url: "",
    baseURL: serveUrl,
    headers: {
      "Content-Type": "text/plain",
      "X-Requested-With": "XMLHttpRequest"
    },
    timeout: 5000
};

export const uploadConfig = {
    url: "",
    baseURL: serveUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest"
    },
    timeout: 5000
}