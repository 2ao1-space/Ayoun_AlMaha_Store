import { useEffect, useRef } from "react";

interface UseCarouselProps {
  (
    trackRef: React.RefObject<HTMLDivElement | null>,
    deps: React.DependencyList,
    setCardIndex?: (index: number) => void
  ): void;
}

const useCarousel: UseCarouselProps = (trackRef, deps, setCardIndex) => {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = 220 + 24;

    const snapToCard = () => {
      if (!hasMoved.current) return;

      const scrollPos = track.scrollLeft;
      const index = Math.round(scrollPos / cardWidth);

      track.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });

      setCardIndex?.(index);
      hasMoved.current = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      hasMoved.current = false;
      track.style.cursor = "grabbing";
      startX.current = e.pageX;
      scrollLeft.current = track.scrollLeft;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();

      const x = e.pageX;
      const diff = startX.current - x;

      if (Math.abs(diff) > 5) {
        hasMoved.current = true;
      }

      track.scrollLeft = scrollLeft.current + diff;

      const index = Math.round(track.scrollLeft / cardWidth);
      setCardIndex?.(index);
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      track.style.cursor = "grab";

      if (hasMoved.current) {
        snapToCard();
      }
    };

    const handleMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        track.style.cursor = "grab";

        if (hasMoved.current) {
          snapToCard();
        }
      }
    };

    const handleClick = (e: Event) => {
      if (hasMoved.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    track.addEventListener("mousedown", handleMouseDown);
    track.addEventListener("mousemove", handleMouseMove);
    track.addEventListener("mouseup", handleMouseUp);
    track.addEventListener("mouseleave", handleMouseLeave);
    track.addEventListener("click", handleClick, true);

    return () => {
      track.removeEventListener("mousedown", handleMouseDown);
      track.removeEventListener("mousemove", handleMouseMove);
      track.removeEventListener("mouseup", handleMouseUp);
      track.removeEventListener("mouseleave", handleMouseLeave);
      track.removeEventListener("click", handleClick, true);
    };
  }, deps);
};

export default useCarousel;

// import { useEffect, useRef } from "react";

// export default function useCarousel(trackRef, deps, setCardIndex) {
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);
//   const hasMoved = useRef(false);

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     const cardWidth = 220 + 24;

//     const snapToCard = () => {
//       if (!hasMoved.current) return;

//       const scrollPos = track.scrollLeft;
//       const index = Math.round(scrollPos / cardWidth);

//       track.scrollTo({
//         left: index * cardWidth,
//         behavior: "smooth",
//       });

//       setCardIndex?.(index);
//       hasMoved.current = false;
//     };

//     const handleMouseDown = (e) => {
//       isDragging.current = true;
//       hasMoved.current = false;
//       track.style.cursor = "grabbing";
//       startX.current = e.pageX;
//       scrollLeft.current = track.scrollLeft;
//     };

//     const handleMouseMove = (e) => {
//       if (!isDragging.current) return;
//       e.preventDefault();

//       const x = e.pageX;
//       const diff = startX.current - x;

//       if (Math.abs(diff) > 5) {
//         hasMoved.current = true;
//       }

//       track.scrollLeft = scrollLeft.current + diff;

//       const index = Math.round(track.scrollLeft / cardWidth);
//       setCardIndex?.(index);
//     };

//     const handleMouseUp = () => {
//       if (!isDragging.current) return;
//       isDragging.current = false;
//       track.style.cursor = "grab";

//       if (hasMoved.current) {
//         snapToCard();
//       }
//     };

//     const handleMouseLeave = () => {
//       if (isDragging.current) {
//         isDragging.current = false;
//         track.style.cursor = "grab";

//         if (hasMoved.current) {
//           snapToCard();
//         }
//       }
//     };

//     const handleClick = (e) => {
//       if (hasMoved.current) {
//         e.preventDefault();
//         e.stopPropagation();
//       }
//     };

//     track.addEventListener("mousedown", handleMouseDown);
//     track.addEventListener("mousemove", handleMouseMove);
//     track.addEventListener("mouseup", handleMouseUp);
//     track.addEventListener("mouseleave", handleMouseLeave);
//     track.addEventListener("click", handleClick, true);

//     return () => {
//       track.removeEventListener("mousedown", handleMouseDown);
//       track.removeEventListener("mousemove", handleMouseMove);
//       track.removeEventListener("mouseup", handleMouseUp);
//       track.removeEventListener("mouseleave", handleMouseLeave);
//       track.removeEventListener("click", handleClick, true);
//     };
//   }, deps);
// }
