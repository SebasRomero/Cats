import { useEffect, useState } from "react";
import { getFacts } from "../hooks/getFacts";
import type { Fact } from "../types/facts";
import FactCard from "./FactCard";

const Facts = () => {
  const [facts, setFacts] = useState([]);
  console.log(facts);
  useEffect(() => {
    getFacts()
      .then((res: any) => {
        setFacts(res);
      })
      .catch((error: any) => console.log(error));
  }, []);
  return (
    <section className="mx-auto max-w-7xl my-10 px-6 md:px-4 h-[90vh]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {facts.map((fact: Fact) => (
          <FactCard key={fact.id} fact={fact.fact} />
        ))}
      </div>
    </section>
  );
};

export default Facts;
