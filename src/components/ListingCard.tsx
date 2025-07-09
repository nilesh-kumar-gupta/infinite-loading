interface ListingCardProps {
    title: string;
    description: string;
    price: number;
}

const ListingCard: React.FC<ListingCardProps> = ({title, description, price}) => {
    return <div className="w-2/5 border-2 mx-auto p-6 border-gray-200 rounded-2xl shadow-lg space-y-6">
        <p>{title}</p>
        <p>{description}</p>
        <p>{price}</p>
    </div>
}

export default ListingCard;