import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

interface Card {
  id: number;
  src: string;
}

export default function useCards() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cards, setCards] = useState<Card[]>([
    { id: 1, src: "/images/Cards_Img/auth_pic1.png" },
    { id: 2, src: "/images/Cards_Img/auth_pic1.png" },
    { id: 3, src: "/images/Cards_Img/auth_pic2.png" },
    { id: 4, src: "/images/Cards_Img/auth_pic3.png" },
    { id: 5, src: "/images/Cards_Img/auth_pic4.png" },
    { id: 6, src: "/images/Cards_Img/auth_pic5.png" },
    { id: 7, src: "/images/Cards_Img/auth_pic6.png" },
    { id: 8, src: "/images/Cards_Img/auth_pic7.png" },
    { id: 9, src: "/images/Cards_Img/auth_pic8.png" },
    { id: 10, src: "/images/Cards_Img/auth_pic9.png" },
    { id: 11, src: "/images/Cards_Img/auth_pic10.png" },
    { id: 12, src: "/images/Cards_Img/auth_pic11.png" },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || isAnimating) return;

      const animateTopCard = () => {
        setIsAnimating(true);
        const topCard = containerRef.current?.querySelector(
          `[data-card-index="0"]`
        );
        if (!topCard) {
          setIsAnimating(false);
          return;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            setCards((prev) => {
              const newCards = [...prev];
              const movedCard = newCards.shift()!;
              newCards.push(movedCard);
              return newCards;
            });
            gsap.set(topCard, { x: 0, scale: 1, opacity: 1 });
            setIsAnimating(false);
          },
        });

        tl.to(topCard, {
          x: -15,
          rotate: "-4deg",
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        })
          .to(topCard, {
            rotate: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "power2.in",
          })
          .to({}, { duration: 2 })
          .to(topCard, {
            x: -window.innerWidth * 0.2,
            scale: 0.9,
            opacity: 0.5,
            duration: 0.5,
            ease: "power2.inOut",
          })
          .to(topCard, {
            zIndex: -10,
            scale: 0.5,
            x: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
      };

      animateTopCard();
    },
    { dependencies: [isAnimating, cards], scope: containerRef }
  );
  return { containerRef, cards };
}
