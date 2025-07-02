import { BACKEND_URL } from "../constants/constants";

export async function addFact(
  fact: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>
) {
  let response;

  try {
    response = await fetch(BACKEND_URL + "/catfacts", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ fact: fact }),
    });
    if (response.status != 201) {
      setError("That fact already exist");
      setMessage(null)
      return;
    }
    setError(null);
    setMessage("Fact added succesfully!")
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
