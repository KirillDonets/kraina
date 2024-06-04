import axios from "axios";
import { http } from "./http";

export const getFilms = async () => {
    const { data } = await http.get(
        "/films.json"
    );
    return data;
}