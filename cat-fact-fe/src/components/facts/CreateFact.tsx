import { useState } from "react";
import { addFact } from "../../hooks/addFact";

const CreateFact = () => {
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState<null | string>(null);
  async function handleSubmit(formData: any) {
    const fact = formData.get("fact");
    await addFact(fact, setError, setMessage);
  }

  return (
    <div className="mx-auto max-w-7xl flex justify-center items-center h-[90vh]">
      <form className="w-[30rem] py-10 bg-gray-100 " action={handleSubmit}>
        <div className="flex flex-col mx-8">
          <label className="text-2xl">Fact</label>
          <input
            type="text"
            name="fact"
            required
            className="my-4 bg-white p-2 outline-orange-300"
            placeholder="A cat fact..."
          />
          {error != null ? <span className="text-red-400">{error}</span> : null}
          {message != null ? <span className="text-green-400">{message}</span> : null}
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-orange-300 hover:bg-orange-200 px-4 py-2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFact;
