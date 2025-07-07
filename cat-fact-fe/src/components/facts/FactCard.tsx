import { useState } from "react";
import { deleteFact } from "../../hooks/deleteFact";
import type { Fact } from "../../types/facts";
import { updateFact } from "../../hooks/updateFact";

interface FastCardProps {
  id: number;
  name: string;
  setFacts: React.Dispatch<React.SetStateAction<Fact[]>>;
}
const FactCard = ({ id, name, setFacts }: FastCardProps) => {
  const [factTxtArea, setFactTxtArea] = useState(name);
  async function handleDelete(id: number) {
    const response = await deleteFact(id);
    if (response) {
      setFacts((prev) => prev.filter((element) => element.id != id));
    }
  }
  async function handleUpdate(id: number) {
    const trimmedFact = factTxtArea.trim();

    if (!trimmedFact) {
      alert("Fact cannot be empty");
      setFactTxtArea(name)
      return;
    }

 try {
    const response = await updateFact(id, trimmedFact);
    if (response?.detail?.statusCode === 400) {
      setFactTxtArea(name);
    }
  } catch (error) {
    console.error(error);
    setFactTxtArea(name);
  }
  }

  return (
    <div className="bg-gray-200 w-full h-60 pt-4 hover:bg-gray-300 hover:scale-105 overflow-hidden flex flex-col justify-between">
      <div className=" text-center flex justify-center items-center rounded-xl px-4 ">
        <textarea
          onChange={(e) => setFactTxtArea(e.target.value)}
          value={factTxtArea}
          className="w-full h-[10rem] resize-none outline-none focus:border-black"
        ></textarea>
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={() => handleUpdate(id)}
          className="bg-blue-400 w-full hover:bg-blue-300"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="bg-red-400 w-full hover:bg-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FactCard;
