"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Card } from "./card";
import AppAvatar from "../common/app-avatar";
import { Heading3, Paragraph } from "./typography";

import {TestimonialType} from "@/types"; 

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  type,
}: {
  items: TestimonialType[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  type: "testimonials" | "brands"
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-2 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
            type === "brands" ? <Brand key={idx}/>: <Testimonial key={idx} {...item}/>
        ))}
      </div>
    </div>
  );
};

const Brand = () => (
    <div
        className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
        style={{
        background:
            "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
        }}
    >
         
    </div>
);

const Testimonial = ({
    avatar, name, title, quote
}: {
    avatar: string;
    name: string; 
    title: string; 
    quote: string; 
}) => (
    <Card
        className="w-[350px] max-w-full relative rounded-lg flex-shrink-0 px-8 py-6 md:w-[450px]"
    >
        <div className="flex gap-2 items-center mb-2">
            <AppAvatar 
                src={avatar}
                name={name}
                dimension={"w-9 h-9"}
            />
            <div>
                <Heading3 className="text-md lg:text-lg">{name}</Heading3>
                <Paragraph className="text-gray-500 text-xs lg:text-sm">{title}</Paragraph>
            </div>  
        </div>
        <Paragraph>{quote}</Paragraph>
    </Card>
)

{/* <li
className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
style={{
  background:
    "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
}}
key={item.name}
>
<blockquote>
  <div
    aria-hidden="true"
    className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
  ></div>
  <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
    {item.quote}
  </span>
  <div className="relative z-20 mt-6 flex flex-row items-center">
    <span className="flex flex-col gap-1">
      <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
        {item.name}
      </span>
      <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
        {item.title}
      </span>
    </span>
  </div>
</blockquote>
</li> */}