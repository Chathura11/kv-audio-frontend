import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-[200px] h-[350px] flex flex-col items-center relative">
            <img src={item.image[0]} alt={item.name} className="w-40 h-30 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-500 text-sm">{item.category}</p>
            <p className="text-gray-700 text-sm mt-1">{item.description}</p>
            <p className="text-xl font-bold mt-2">{item.price}</p>
            <p className={`text-sm mt-1 ${item.availability ? 'text-green-500' : 'text-red-500'}`}>
                {item.availability ? 'In Stock' : 'Out of Stock'}
            </p>
            <Link to={'/product/'+item.key} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-auto absolute bottom-4">View Details</Link>
        </div>
    );
}