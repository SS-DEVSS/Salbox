import CheckMarkIcon from "/icons/CheckMark.png";

type WarrantyQualityCheckCardProps = {
  text: string;
};

const WarrantyQualityCheckCard = ({ text }: WarrantyQualityCheckCardProps) => {
  return (
    <div className="w-full h-[80px] bg-scarlet-100 flex items-center gap-4 p-4 rounded-lg">
      <img src={CheckMarkIcon} className="w-8" alt="checkmark" />
      <p className="font-medium">{text}</p>
    </div>
  );
};

export default WarrantyQualityCheckCard;
