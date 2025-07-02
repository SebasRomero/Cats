interface CardHome {
  image: string;
  alt: string;
}
const CardHome = ({ image, alt }: CardHome) => {
  return (
    <div>
      <img loading="lazy"
        className="bg-center bg-cover w-full h-[35rem] lg:h-[20rem] rounded-lg"
        src={image}
        alt={alt}
      />
    </div>
  );
};

export default CardHome;
