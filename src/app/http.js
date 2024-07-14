import axios from "axios";

export const apiKey = '6354d9421b6c9d2510d1a693d1dc40b4';
export const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU0ZDk0MjFiNmM5ZDI1MTBkMWE2OTNkMWRjNDBiNCIsInN1YiI6IjY2MWUwNzRiZDc1YmQ2MDE0OTMwYjkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgpHSSmlqPeSbkO8Tgkva_SbS937PRPTX_4nBKsFSHI';
export const baseUrl = 'https://api.themoviedb.org/3';


export const baseURL = 'https://0099-217-199-237-96.ngrok-free.app';

const api = axios.create({
    baseURL: `${baseURL}/api`,
    headers:{
        "ngrok-skip-browser-warning": "69420"
    }
});
export default api;