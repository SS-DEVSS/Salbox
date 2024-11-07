import { WobbleCard } from "./ui/wobble-card";

const Promotions = () => {
  return (
    <main className="pt-16 md:pt-24 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-5 px-4 lg:px-20 xl:px-32">
        <WobbleCard containerClassName="basis-2/5 bg-scarlet-400 rounded-xl min-h-[350px]">
          .
        </WobbleCard>
        <WobbleCard containerClassName="basis-3/5 bg-moonstone-200 rounded-xl min-h-[350px]">
          .
        </WobbleCard>
      </div>
      <div className="flex flex-col md:flex-row gap-4 px-4 lg:px-20 xl:px-32">
        <WobbleCard containerClassName="basis-3/5 bg-moonstone-500 rounded-xl min-h-[350px]">
          .
        </WobbleCard>
        <WobbleCard containerClassName="basis-2/5 bg-scarlet-200 rounded-xl min-h-[350px]">
          .
        </WobbleCard>
      </div>
    </main>
  );
};

export default Promotions;
