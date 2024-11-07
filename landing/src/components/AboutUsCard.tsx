type AboutUsCardProps = {
  img: string;
  title: string;
  content: string;
};

const AboutUsCard = ({ img, title, content }: AboutUsCardProps) => {
  return (
    <main className="w-full rounded-2xl bg-white_smoke text-black flex flex-col items-center mb-4 p-7 md:flex-row md:gap-6 md:px-9 md:py-6 md:text-justify">
      <img src={img} className="w-20" alt={`${title} image`} />
      <div>
        <h4 className="text-xl font-bold my-4 md:mb-2 md:mt-0">{title}</h4>
        <p className="text-[#7F7F7F] text-sm leading-7">{content}</p>
      </div>
    </main>
  );
};

export default AboutUsCard;
