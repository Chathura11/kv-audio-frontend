import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 m-4 w-[300px] h-[400px] flex flex-col items-center relative shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <img src={item.image[0]} alt={item.name} className="w-40 h-30 object-contain rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-500 text-sm">{item.category}</p>
            <p className="text-gray-700 text-sm mt-1">{item.description}</p>
            <p className="text-xl font-bold mt-2">{item.price}</p>
            <p className={`text-sm mt-1 ${item.availability ? 'text-green-500' : 'text-red-500'}`}>
                {item.availability ? 'In Stock' : 'Out of Stock'}
            </p>
            <Link to={'/product/'+item.key} className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-900 mx-auto absolute bottom-4">View Details</Link>
        </div>
    );
}