const FactCard = (props: any) => {
  return (
    <div
      className="bg-gray-200 w-full h-60 p-4 text-center flex justify-center items-center rounded-xl hover:bg-gray-300 hover:scale-105 overflow-hidden"
    >
      <span
        title={props.fact}
        className="block overflow-hidden text-clip max-w-full"
      >
        {props.fact}
      </span>
    </div>
  );
};


export default FactCard