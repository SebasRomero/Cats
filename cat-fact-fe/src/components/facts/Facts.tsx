import { useEffect, useState } from "react";
import { getFacts } from "../../hooks/getFacts";
import type { Fact } from "../../types/facts";
import FactCard from "./FactCard";
import Pagination from "../pagination/Pagination";
import { useSearchParams } from "react-router";
import { getPages } from "../pagination/getPages";

const Facts = () => {
  const [facts, setFacts] = useState([]);
  const [pages, setPages] = useState<(number | string)[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    getFacts(currentPage)
      .then((response) => {
        setFacts(response.results);
        setTotalPages(response.pages);
        setPages(getPages(currentPage, response.pages));
      })
      .catch((error: any) => console.log(error));
  }, []);
  return (
    <section className="mx-auto max-w-7xl mt-10 px-6 md:px-4 h-[90vh] flex flex-col justify-between">
      {facts.length == 0 ? (
        <div className="flex justify-center items-center h-full">
          <span>No facts available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {facts.map((fact: Fact) => (
            <FactCard key={fact.id} fact={fact.fact} />
          ))}
        </div>
      )}
      <div className=" pb-4 mb-4">
        <Pagination
          currentPage={currentPage}
          pages={pages}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
};

export default Facts;
