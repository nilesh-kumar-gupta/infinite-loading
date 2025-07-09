import {useState} from "react";
import ListingCard from "./ListingCard.tsx";

interface IListing {
    title: string;
    description: string;
    price: number;
}

const sampleListing: IListing[] = new Array(100).fill({
    title: 'title1',
    description: 'desc1',
    price: 5,
});

const Listing = () => {

    const [listing, setListing] = useState<IListing[]>(() => sampleListing);
    return <div className="w-1/2 mx-auto">
        {listing.map((item, index) => (
            <ListingCard key={index}  title={item.title} description={item.description} price={item.price} />
        ))}
    </div>
}

export default Listing;