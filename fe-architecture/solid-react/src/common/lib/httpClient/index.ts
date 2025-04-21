import { IHttp } from "../../interfaces/http.interface";
import axios from "axios";

const Http = (): IHttp => ({
  get: async <T>(url: string): Promise<T> =>
    axios.get<T>(url).then(({ data }) => data),
});

export default Http;
