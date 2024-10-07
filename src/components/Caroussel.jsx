import { list, shortList, longList } from "../data";
import { useState, useEffect, useCallback } from "react";
import { FaAngleLeft, FaAngleRight, FaQuoteRight } from "react-icons/fa6";

const Caroussel = () => {
  const [people, setPeople] = useState(list);
  const [shown, setShown] = useState(0);

  const handlePrev = useCallback(() => {
    setShown((oldShown) => {
      return (oldShown - 1 + people.length) % people.length;
    });
  }, [people.length]);

  const handleNext = useCallback(() => {
    setShown((oldShown) => {
      return (oldShown + 1) % people.length;
    });
  }, [people.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext(); // Now handleNext is memoized, so it's safe to use here
    }, 3000);

    return () => clearInterval(intervalId);
  }, [handleNext]);

  return (
    <section className="slider-container">
      {people.map((person, index) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            key={id}
            className="slide"
            style={{
              transform: `translateX(${100 * (index - shown)}%)`,
              opacity: index === shown ? 1 : 0,
              visibility: index === shown ? "visible" : "hidden",
            }}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={handlePrev}>
        <FaAngleLeft />
      </button>
      <button type="button" className="next" onClick={handleNext}>
        <FaAngleRight />
      </button>
    </section>
  );
};
export default Caroussel;

// If the calculation of "index - shown" === 0, it is going to be the active slide.
// transform: `translateX(${100 * (index - shown)}%)`;
// 100 * (0 - 0) = 0
// 100 * (1 - 0) = 100

// as soon as we set up the prev and next functionality we can change the shown state i.e.:

// 100 * (0 - 1) = -100  => index 0 moves 100% of its width to the left
// 100 * (1 - 1) = 0

// MODULO
// Used to make sure that we can repeat the "cycle process" after reaching the first or last index of our array ie.:

// 0 being the first index and 3 being the last index in this particular array...

// const result = (oldShown + 1) % people.length
// 0 + 1 = 1 % 4 = 4 fits 0 times remainder = 1
// 3 + 1 = 4 % 4 = 4 fits 1 times remainder = 0

// const result = (oldShown - 1 + people.length) % people.length;
// 3 - 1 =  2 + 4 = 6 % 4 = 4 fits 1 times remainder = 2
// 0 - 1 = -1 + 4 = 3 % 4 = 4 fits 0 times remainder = 3

// Removed due to issues with JS closure

// const handlePrev = () => {
//   setShown((oldShown) => {
//     const result = (oldShown - 1 + people.length) % people.length;
//     return result;
//   });
// };

// const handleNext = () => {
//   setShown((oldShown) => {
//     const result = (oldShown + 1) % people.length;
//     return result;
//   });
// };

// useEffect(() => {
//   const intervalId = setInterval(() => {
//     handleNext();
//   }, 3000);
//   return clearInterval(intervalId);
// }, [shown]);
