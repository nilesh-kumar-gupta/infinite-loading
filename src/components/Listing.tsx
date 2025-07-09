import { useEffect, useMemo, useRef, useState } from "react";
import ListingCard from "./ListingCard.tsx";
import type { IListing } from "../types/types.ts";
import { mockFetchListing } from "../services/listing.ts";
import { debounce } from "../utils/utils.ts";
import { useObserver } from "../context/ObserverContext.tsx";
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const INITIAL_ITEMS = 20

const Listing = () => {

    const [listing, setListing] = useState<IListing[]>([]);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const [endIndex, setEndIndex] = useState(INITIAL_ITEMS);
    const [isFetching, setIsFetching] = useState(false);
    const pageNumberRef = useRef(1);
    const {
        isVisible: isLastElementVisible,
        observeElement, 
        unobserveElement
    } = useObserver();

    const slicedListing = useMemo(() => listing.slice(0, endIndex), [listing, endIndex]);

    // const fetchListingQuery = useInfiniteQuery({
    //     queryKey: ['fetchListing'],
    //     queryFn: (pageParam) => mockFetchListing(pageParam),
    //     initialPageParam: 1,
    // })

    const handleFetch = debounce(async () => {
        setIsFetching(true)
        const resp = await mockFetchListing(pageNumberRef.current);
        if (resp.success) {
            setListing(listing => [...listing, ...resp.data]);
            setEndIndex(endIndex => endIndex + 20)
            pageNumberRef.current += 1
        }
        setIsFetching(false);
    }, 1000);

    useEffect(() => {
        if (lastElementRef.current)
            observeElement(lastElementRef.current);

        return () => {
            if(lastElementRef.current)
                unobserveElement(lastElementRef.current)
        }
    }, [])

    useEffect(() => {
        if (!listing.length)
            handleFetch();
    }, [])

    useEffect(() => {
        if(isLastElementVisible && !isFetching)
            handleFetch();
    }, [isLastElementVisible])


    return <div className="w-1/2 mx-auto" id="list-container">
        {slicedListing.map((item) => (
            <ListingCard key={item.id} details={item} />
        ))}
        <div ref={lastElementRef} className="w-full h-10 invisible"></div>
    </div>
}

export default Listing;