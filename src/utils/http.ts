import axios, { AxiosInstance } from "axios";
import { POST_API } from "../path/config";

class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: `${POST_API}`,
            timeout: 10000,
            headers: {
                "Content-type" : "application/json",
            },
        });
    }

}
const http = new Http().instance;
export default http;