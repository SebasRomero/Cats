import { BACKEND_URL } from "../constants/constants";

export async function getFacts(page: number) {
    const response = await fetch(`${BACKEND_URL}/catfacts?page=${page}`);
    return await response.json()
}