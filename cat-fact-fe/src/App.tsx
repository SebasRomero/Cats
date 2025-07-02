import CardHome from "./components/CardHome";

function App() {
  return (
    <section className="mx-auto mt-10 max-w-7xl h-[90vh] px-4">
      <div>
        <h1 className="text-3xl">
          This is the Cat Fact Tracker coding project! Keep going to discover or
          add new random facts about cats (which are the best pet in my opinion)
        </h1>
        <div className="flex flex-col justify-center items-center mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full bg-orange-200 rounded-xl max-w-2xl p-4">
            <CardHome image="/luna1.avif" alt="luna1"/>
            <CardHome image="/luna2.avif" alt="luna2"/>
            <CardHome image="/luna3.avif" alt="luna3"/>
            <CardHome image="/luna4.avif" alt="luna4"/>
          </div>
          <p className="text-lg my-4">This is Luna, a random fact from her is that she doesn't like when people walk over her, she will attack you if you invade her space.</p>
        </div>
      </div>
    </section>
  );
}

export default App;
