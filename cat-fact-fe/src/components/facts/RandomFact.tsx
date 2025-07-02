import { useEffect, useState } from "react";
import FactCard from "./FactCard";
import { getRandomFact } from "../../hooks/getRandomFact";
import type { Fact } from "../../types/facts";

const RandomFact = () => {
  const [fact, setFact] = useState<Fact | null>(null);
  console.log(fact);
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
          <FactCard key={fact.id} fact={fact.fact} />
        ) : (
          <span>No random fact available</span>
        )}
      </div>
    </section>
  );
};

export default RandomFact;
