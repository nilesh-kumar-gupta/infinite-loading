import { useEffect, useMemo, useRef, useCallback } from "react";
import ListingCard from "./ListingCard.tsx";
import { mockFetchListing } from "../services/listing.ts";
import useObserver from "../hooks/useObserver.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import debounce from 'lodash/debounce';

const Listing = () => {
    const lastElementRef = useRef<HTMLDivElement>(null);
    const {
        isVisible: isLastElementVisible,
        observeElement,
        unobserveElement
    } = useObserver();

    const fetchListingQuery = useInfiniteQuery({
        queryKey: ['fetchListing'],
        queryFn: ({ pageParam }) => mockFetchListing(pageParam),
        initialPageParam: 1,
        getNextPageParam: (_, pages) => pages.length < 5 ? pages.length + 1: null,
        refetchOnWindowFocus: false,
    });

    const allListings = useMemo(() => {
        if (!fetchListingQuery.data) return [];
        return fetchListingQuery.data.pages.flatMap(page => page.data);
    }, [fetchListingQuery.data]);

    useEffect(() => {
        const lastElement = lastElementRef.current;
        if (lastElement) {
            observeElement(lastElement);
        }

        return () => {
            if (lastElement) {
                unobserveElement(lastElement);
            }
        };
    }, [observeElement, unobserveElement]);

    const debouncedFetchNextPage = useCallback(
        debounce(() => {
            if (!fetchListingQuery.isFetching && fetchListingQuery.hasNextPage) {
                fetchListingQuery.fetchNextPage();
            }
        }, 2500),
        [fetchListingQuery]
    );

    useEffect(() => {
        if (isLastElementVisible && fetchListingQuery.hasNextPage) {
            debouncedFetchNextPage();
        }
    }, [isLastElementVisible, debouncedFetchNextPage, fetchListingQuery.hasNextPage]);

    return (
        <div className="w-full sm:w-11/12 md:w-10/12 lg:w-3/4 xl:w-2/3 mx-auto px-2 sm:px-4 md:px-6 relative">
            {/* Error state */}
            {fetchListingQuery.isError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded relative my-2 sm:my-4">
                    <strong className="font-bold text-sm sm:text-base">Error!</strong>
                    <span className="block text-sm sm:text-base"> Failed to load listings. Please try again later.</span>
                </div>
            )}

            {/* Empty state */}
            {!fetchListingQuery.isLoading && allListings.length === 0 && !fetchListingQuery.isError && (
                <div className="text-center py-6 sm:py-10">
                    <p className="text-gray-500 text-sm sm:text-base">No listings found.</p>
                </div>
            )}

            {/* Listings */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 my-2 sm:my-4">
                {allListings.map((item, index) => (
                    <ListingCard key={`${item.id}-${index}`} details={item} />
                ))}
            </div>

            {/* Loading indicator */}
            {(fetchListingQuery.isFetching || fetchListingQuery.isLoading) && (
                <div className="flex justify-center items-center py-4 h-full sm:h-screen absolute top-0 left-0 w-full bg-gray-100 bg-opacity-50 z-10">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20 border-b-2 sm:border-b-3 md:border-b-5 border-gray-900"></div>
                </div>
            )}

            {/* Invisible element for intersection observer */}
            {allListings.length > 0 && <div ref={lastElementRef} className="w-full h-10 invisible z-100"></div>}
        </div>
    )
}

export default Listing;
