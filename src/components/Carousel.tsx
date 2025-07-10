import { useState } from "react"
import type { ICarouselMedia } from "../types/types"

interface ICarouselProps {
  mediaList: ICarouselMedia[],
  isVisible: boolean,
}

const Carousel: React.FC<ICarouselProps> = ({mediaList}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % mediaList.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + mediaList.length) % mediaList.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-80 flex justify-center items-center">
      <div className="space-y-6 w-full h-60 flex justify-center items-center">
        {mediaList.map((media, index) => {
          const { type, src } = media;
          if(type === "image") {
            return (
              <img 
                key={index} 
                src={src}
                className={`max-h-60 sm:max-h-72 md:max-h-80 lg:max-h-96 w-full mx-auto object-contain ${currentIndex === index ? "" : "hidden"}`}
                alt={`Listing image ${index + 1}`}
              />
            );
          }
          return (
            <video 
              key={index} 
              src={src} 
              className={`max-h-60 sm:max-h-72 md:max-h-80 lg:max-h-96 w-full mx-auto object-contain ${currentIndex === index ? "" : "hidden"}`}
              muted
              loop
              autoPlay
              controls
            />
          );
        })}
      </div>

      {/* Navigation buttons */}
      {mediaList.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 sm:p-2 shadow-md hover:bg-opacity-70"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={goToNext}
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 sm:p-2 shadow-md hover:bg-opacity-70"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Position indicators (dots) */}
          <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 flex space-x-1 rounded bg-white p-1 sm:p-2">
            {mediaList.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  currentIndex === index ? 'bg-gray-700' : 'bg-gray-400 bg-opacity-50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
