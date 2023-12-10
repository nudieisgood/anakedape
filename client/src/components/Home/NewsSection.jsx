import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";

import FadeIn from "../Helpers/FadeIn";

import { news } from "../../assets/data";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
const News = () => {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="my-28 md:my-40">
      <FadeIn delay={0.3} direction="right">
        <div className="px-5 max-w-4xl mx-auto">
          {news.map((item, index) => (
            <div key={index} className="mb-10">
              <Accordion
                open={open === index + 1}
                icon={<Icon id={index + 1} open={open} />}
              >
                <AccordionHeader onClick={() => handleOpen(index + 1)}>
                  <div className="text-sm sm:text-lg flex flex-grow flex-col sm:flex-row gap-2 sm:justify-start">
                    <p>{item.date}</p>
                    <p className="text-sm sm:text-lg flex-1 sm:text-center">
                      {item.title}
                    </p>
                  </div>
                </AccordionHeader>
                <AccordionBody className="text-md sm:text-xl leading-loose">
                  {item.content}
                </AccordionBody>
              </Accordion>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};
export default News;
