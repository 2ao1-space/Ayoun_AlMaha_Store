import Image from "next/image";
import useCards from "../../hooks/useCards";
export interface Card {
  id: number;
  src: string;
}

export default function CardsFigure({ CardImg }: { CardImg: Card[] }) {
  const { containerRef, cards } = useCards({ CardImg });

  return (
    <div className="w-full h-full flex justify-center items-center relative py-20">
      <div
        ref={containerRef}
        className="relative w-[250px] flex justify-center items-center"
      >
        {cards.map((card, index) => (
          <Image
            key={`${card.id}-${index}`}
            src={card.src}
            width={200}
            height={300}
            data-card-index={index}
            className="absolute w-[250px] h-[333px] shadow-lg flex items-center justify-center transform object-cover"
            style={{ zIndex: cards.length - index }}
            alt={`Card ${card.id}`}
          />
        ))}
      </div>
    </div>
  );
}
