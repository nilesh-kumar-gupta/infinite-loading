import { useState, useEffect } from "react"
import type { ICarouselMedia } from "../types/types"

interface ICarouselProps {
  mediaList: ICarouselMedia[]
}

const Carousel: React.FC<ICarouselProps> = ({mediaList}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setCurrentIndex(currentIndex => {
        return (currentIndex + 1) % mediaList.length;
      })
    }, 5000)

    return () => {
      if(intervalId) clearInterval(intervalId);
    }
  })

  return <div className="space-y-6 w-full h-80 p-1 flex justify-center align-center">
    {mediaList.map(({type, src}, index) => {
      if(type === "image")
        return <img key={index} src={src} className={`max-h-80 w-auto mx-auto ${currentIndex === index ? "" : "hidden"}`} />
      return <video key={index} src={src} className={`max-h-80 w-auto mx-auto ${currentIndex === index ? "" : "hidden"}`} autoPlay/>
    })}
  </div>

}

export default Carousel;