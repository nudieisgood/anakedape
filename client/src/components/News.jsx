import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import FadeIn from "./FadeIn";

import { news } from "../data";

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
          {/* <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            <div className="flex flex-grow flex-col sm:flex-row gap-2 sm:justify-start">
              <p>2023/10/10</p>
              <p className="flex-1 sm:text-center ">
                Notification of paperless packing list
              </p>
            </div>
          </AccordionHeader>
          <AccordionBody className="text-xl leading-loose">
            DESCENDANT Official Webstore will make the switch to paperless
            packing lists. Due to this change, a printed packing list will no
            longer be included within shipments. If a physical packing list is
            required please download this from the URL attached to the email
            shipping notification.
          </AccordionBody>
        </Accordion> */}

          {/* <div>
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            <div className="flex flex-grow flex-col sm:flex-row gap-2 sm:justify-start">
              <p>2023/10/20</p>
              <p className="flex-1 sm:text-center ">
                2023 AW Collection Web Information
              </p>
            </div>
          </AccordionHeader>
          <AccordionBody className="text-xl leading-loose">
            From the 2023 Fall/Winter season, the collections lineup reveal will
            gradually be made according to its delivery. For new items, they
            will be posted a week prior to its release date.
          </AccordionBody>
        </Accordion>
      </div> */}
        </div>
      </FadeIn>
    </div>
  );
};
export default News;
