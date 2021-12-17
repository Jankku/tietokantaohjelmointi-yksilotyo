import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost/tietokantaohjelmointi-yksilotyo/backend/",
    timeout: 30000,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
});

export default axiosInstance;
