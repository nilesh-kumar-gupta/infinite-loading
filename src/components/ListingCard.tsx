import { useEffect, useRef } from "react";
import type { ICarouselMedia, IListing } from "../types/types";
import Carousel from "./Carousel";

import useObserver from "../hooks/useObserver.ts";

interface ListingCardProps {
    details: IListing
}

const ListingCard: React.FC<ListingCardProps> = ({details}) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const {isVisible, observeElement, unobserveElement} = useObserver();

    const mediaList = [
        ...details.media.videos.map((src) => ({type: "video", src})), 
        ...details.media.images.map((src) => ({type: "image", src}))
    ] as ICarouselMedia[];

    useEffect(() => {
        const containerElement = containerRef.current;
        if(containerElement)
            observeElement(containerElement);

        return () => {
            if(containerElement)
                unobserveElement(containerElement);
        }
    }, [])

    return (
    <div 
        ref={containerRef}
        className="w-full sm:w-full md:w-11/12 lg:w-3/4 xl:w-2/3 max-w-4xl h-auto border-2 mx-auto p-3 sm:p-4 md:p-6 border-gray-200 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg space-y-3 sm:space-y-4 md:space-y-6"
    >
        {isVisible && <Carousel mediaList={mediaList} isVisible={isVisible}/>}
        <p className="font-bold text-base sm:text-lg md:text-xl truncate">{details.title}</p>
        <p className="text-gray-700 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">{details.description}</p>
        <p className="font-semibold text-base sm:text-lg">${details.price}/night</p>
    </div>);
}

export default ListingCard;
