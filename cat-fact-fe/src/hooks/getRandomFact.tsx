import { BACKEND_URL } from "../constants/constants";

export async function getRandomFact() {
    const response = await fetch(BACKEND_URL+"/catfacts/random/");
    return await response.json()
}