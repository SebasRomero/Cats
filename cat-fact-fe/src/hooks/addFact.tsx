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

    let data = await response.json();
    if (response.status != 201) {
      setError(data.detail.message);
      setMessage(null)
      return;
    }
    setError(null);
    setMessage("Fact added succesfully!")
    return data;
  } catch (error) {
    console.log(error);
  }
}
