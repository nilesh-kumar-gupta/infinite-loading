import { useEffect, useRef } from "react";
import type { ICarouselMedia, IListing } from "../types/types";
import Carousel from "./Carousel";
import { useObserver } from "../context/ObserverContext";

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
        if(containerRef.current)
            observeElement(containerRef.current);
    
        return () => {
            if(containerRef.current)
                unobserveElement(containerRef.current);
        }
    }, [])

    return (
    <div 
        ref={containerRef}
        className="w-130 border-2 mx-auto p-6 border-gray-200 rounded-2xl shadow-lg space-y-6"
    >
        {isVisible && <Carousel mediaList={mediaList}/>}
        <p>{details.title}</p>
        <p>{details.description}</p>
        <p>{details.price}</p>
    </div>);
}

export default ListingCard;