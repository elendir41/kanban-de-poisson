import { cn } from "@/lib/utils";
import Bubble from "./bubble";
import { useEffect, useState } from "react";

type BubblesProps = {
  className?: string;
};

type Bubble = {
  id: number;
  left: number;
  size: number;
};

export default function Bubbles({ className }: BubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {

    const intervalId = setInterval(
      () => {
        const newBubble = {
          id: Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 30 + 20,
        };

        setBubbles((bubbles) => [...bubbles, newBubble]);

        setTimeout(() => {
          setBubbles((bubbles) =>
            bubbles.filter((bubble) => bubble.id !== newBubble.id)
          );
        }, 10000);
      },
      100
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          left={bubble.left}
          size={bubble.size}
        />
      ))}
    </div>
  );
};
