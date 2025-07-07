

interface RandomCardProps {
  fact: string;
}

const RandomFactCard = ({fact}: RandomCardProps) => {
  return (
    <div className="bg-gray-200 w-full h-60 pt-4 hover:bg-gray-300 hover:scale-105 overflow-hidden text-center flex justify-center items-center rounded-xl px-4">
        <span
          title={fact}
          className="block overflow-hidden text-clip max-w-full"
        >
          {fact}
        </span>
    </div>
  );
};

export default RandomFactCard;
