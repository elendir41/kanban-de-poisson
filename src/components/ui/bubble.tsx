import React from "react";

type BubbleProps = {
  left: number;
  size: number;
};

export default function Bubble({ left, size }: BubbleProps) {
  const translateY = -3;
  const style = {
    "--translate-y": translateY,
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    zIndex: -1,
  } as React.CSSProperties;

  return (
    <>
      <span
        className={`absolute rounded-full bubble bubble-up`}
        style={style}
      ></span>
    </>
  );
}
