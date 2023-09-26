import axios from "axios";

export const apiImage = axios.create({
  baseURL: `https://api.pexels.com/v1/search?query=landscape&per_page=10&page=`,
});
