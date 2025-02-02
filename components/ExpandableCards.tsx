import Image from "next/image";
import Link from "next/link";
import React from "react";

const cardData = [
  {
    title: "Receivable",
    source: "/receivable.png",
  },
  {
    title: "Payable",
    source: "/payable.png",
  },
  {
    title: "Lent",
    source: "/lent.png",
  },
  {
    title: "Borrowed",
    source: "/Borrow.png",
  },
];

const Card = () => {
  return (
    <div className="w-full mx-auto flex justify-between items-center gap-4">
      {cardData.map((item) => {
        return (
          <Link
            href={item.title.toLowerCase()}
            key={item.title}
            className="flex justify-around flex-1 items-center h-20 px-3 rounded-lg shadow-sm hover:shadow-md bg-white"
          >
            <Image
              src={item.source}
              alt={item.title}
              height={100}
              width={100}
              className="h-16 w-16"
            />
            <p className="text-base font-bold text-black">{item.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Card;
