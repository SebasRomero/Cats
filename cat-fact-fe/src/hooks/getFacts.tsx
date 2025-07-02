import { BACKEND_URL } from "../constants/constants";

export async function getFacts() {
    const response = await fetch(BACKEND_URL+"/catfacts");
    return await response.json()
}