import { BACKEND_URL } from "../constants/constants";

export async function deleteFact(id: number) {
    let response 
    try {
        response = await fetch(`${BACKEND_URL}/catfacts?id=${id}`, {method: "DELETE"});
        
    } catch (error) {
        console.log(error)
    }
    return await response?.json()
}