import axios from "axios";

const api = axios.create({
    baseURL: "https://animated-space-meme-97w6pgr54pgxcxwj-3000.app.github.dev/api",
    headers: { "Content-Type": "application/json" }
});

export default api;
