import {useEffect, useMemo, useRef, useState} from "react";
import ListingCard from "./ListingCard.tsx";
import type { IListing } from "../types/types.ts";
import { fetchListing } from "../services/listing.ts";

const INITIAL_ITEMS = 20

const Listing = () => {

    const [listing, setListing] = useState<IListing[]>([]);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const [endIndex, setEndIndex] = useState(INITIAL_ITEMS);
    const pageNumberRef = useRef(1);

    const slicedListing = useMemo(() => listing.slice(0, endIndex), [listing, endIndex]);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {

        console.log("intersection detected");
        console.log({entries, isIntersecting: entries[0].isIntersecting})

        if(entries[0].isIntersecting){
            fetchListing(pageNumberRef.current).then((resp) => {
                if(resp.success){
                    setListing(resp.data);
                    pageNumberRef.current;
                }
            })  
            setEndIndex(endIndex => endIndex + 20)
        }
    }

    const observer = new IntersectionObserver(handleIntersection, {root: null, threshold: 1.0, rootMargin: "300px"});

    useEffect(() => {
        if(lastElementRef.current)
            observer.observe(lastElementRef.current);
    }, [])

    useEffect(() => {
        fetchListing(pageNumberRef.current).then((resp) => {
            if(resp.success){
                console.log(resp);
                setListing(resp.data);
                pageNumberRef.current += 1;
            }
        })
    }, [])


    return <div className="w-1/2 mx-auto">
        {slicedListing.map((item, index) => (
            <ListingCard key={index} title={item.hotel.name} description={item.description} price={item.price} />
        ))}
        <div ref={lastElementRef} className="w-full h-10 invisible"></div>
    </div>
}

export default Listing;