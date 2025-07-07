import { BACKEND_URL } from "../constants/constants";

export async function updateFact(id: number, fact: string) {
  const response = await fetch(`${BACKEND_URL}/catfacts?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({fact}),
  });
  return await response.json();
}
