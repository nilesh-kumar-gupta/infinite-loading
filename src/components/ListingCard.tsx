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
        className="w-130 h-150 border-2 mx-auto p-6 border-gray-200 rounded-2xl shadow-lg space-y-6"
    >
        {isVisible && <Carousel mediaList={mediaList} isVisible={isVisible}/>}
        <p className="font-bold text-lg">{details.title}</p>
        <p className="text-gray-700">{details.description}</p>
        <p className="font-semibold text-lg">{details.price}/night</p>
    </div>);
}

export default ListingCard;
