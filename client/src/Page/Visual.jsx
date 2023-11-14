import { visual } from "../data";
import { useLoaderData } from "react-router-dom";
import { FadeIn, VisualImagesBox, GoToTop } from "../components";

export const loader = () => {
  return visual;
};

const Visual = () => {
  const visualData = useLoaderData();
  return (
    <div className="section-container">
      <FadeIn delay={0.3}>
        <div className="h-screen flex justify-center items-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl tracking-widest font-semibold">VISUAL</h1>
            <h1 className="text-md font-extralight">{visualData.title}</h1>
          </div>
        </div>
      </FadeIn>
      <div className="hidden sm:flex flex-row justify-between sm:gap-10 md:gap-16 px-10 sm:px-16 mb-32">
        <div className="flex flex-col gap-64">
          {visualData?.visualSections?.map((sec, i) => {
            const isOdd = (number) => number % 2 !== 0;
            if (isOdd(i + 1))
              return (
                <FadeIn key={i} delay={0.5} direction="up">
                  <div className="justify-self-start space-y-6">
                    <VisualImagesBox autoSlide={true}>
                      {sec.map((img, i) => {
                        return (
                          <FadeIn isVisual key={i}>
                            <div key={i} className="flex">
                              <img
                                key={i}
                                className="object-cover w-full aspect-[5/6]"
                                src={img}
                                alt=""
                              />
                            </div>
                          </FadeIn>
                        );
                      })}
                    </VisualImagesBox>

                    <div className="flex gap-4">
                      <p className="font-extrabold text-textMd text-6xl">
                        {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
          })}
        </div>

        <div className="flex flex-col gap-64 mt-64">
          {visualData?.visualSections?.map((sec, i) => {
            const isOdd = (number) => number % 2 !== 0;
            if (!isOdd(i + 1))
              return (
                <FadeIn key={i} delay={0.5} direction="down">
                  <div className="justify-self-start space-y-6">
                    <VisualImagesBox autoSlide={true}>
                      {sec.map((img, i) => {
                        return (
                          <FadeIn isVisual key={i}>
                            <div key={i} className="flex">
                              <img
                                key={i}
                                className="object-cover w-full aspect-[5/6]"
                                src={img}
                                alt=""
                              />
                            </div>
                          </FadeIn>
                        );
                      })}
                    </VisualImagesBox>

                    <div className="flex gap-4">
                      <p className="font-extrabold text-textMd text-6xl">
                        {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
          })}
        </div>
      </div>
      <div className="sm:hidden flex flex-col gap-24 mb-24">
        {visualData?.visualSections?.map((sec, i) => {
          const isOdd = (number) => number % 2 !== 0;
          if (isOdd(i + 1))
            return (
              <FadeIn key={i} delay={0.3} direction="up">
                <div className="flex flex-col items-start pr-10 xs:pr-20">
                  <div className="space-y-6">
                    <VisualImagesBox autoSlide={true}>
                      {sec.map((img, i) => {
                        return (
                          <FadeIn isVisual key={i}>
                            <div key={i} className="flex">
                              <img
                                key={i}
                                className="object-cover w-full aspect-[5/6]"
                                src={img}
                                alt=""
                              />
                            </div>
                          </FadeIn>
                        );
                      })}
                    </VisualImagesBox>
                    <div className="flex gap-4">
                      <p className="font-extrabold text-textMd text-6xl">
                        {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );

          if (!isOdd(i + 1))
            return (
              <FadeIn key={i} delay={0.4} direction="down">
                <div className="flex flex-col items-end pl-10 xs:pl-20">
                  <div className="space-y-6">
                    <VisualImagesBox autoSlide={true}>
                      {sec.map((img, i) => {
                        return (
                          <FadeIn isVisual key={i}>
                            <div key={i} className="flex">
                              <img
                                key={i}
                                className="object-cover w-full aspect-[5/6]"
                                src={img}
                                alt=""
                              />
                            </div>
                          </FadeIn>
                        );
                      })}
                    </VisualImagesBox>
                    <div className="flex gap-4 text-start">
                      <p className="font-extrabold text-textMd text-6xl">
                        {i + 1 > 9 ? i + 1 : `0${i + 1}`}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
        })}
      </div>
      <GoToTop />
    </div>
  );
};
export default Visual;
