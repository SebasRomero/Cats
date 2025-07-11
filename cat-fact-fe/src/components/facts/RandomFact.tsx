import { useEffect, useState } from "react";
import { getRandomFact } from "../../hooks/getRandomFact";
import type { Fact } from "../../types/facts";
import RandomFactCard from "./RandomFactCard";

const RandomFact = () => {
  const [fact, setFact] = useState<Fact | null>(null);
  useEffect(() => {
    getRandomFact()
      .then((res: any) => {
        setFact(res);
      })
      .catch((error: any) => console.log(error));
  }, []);
  return (
    <section className="mx-auto max-w-2xl mt-10 px-6 md:px-4 h-[90vh]">
      <div className="flex justify-center items-center h-full">
        {fact != null ? (
          <RandomFactCard key={fact.id} fact={fact.fact} />
        ) : (
          <span>No random fact available</span>
        )}
      </div>
    </section>
  );
};

export default RandomFact;
