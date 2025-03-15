import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";


export default function AdminItemPage(){
    const sampleArray = [
        {
            key: "P001",
            name: "Wireless Headphones",
            price: "120.99",
            category: "Audio",
            dimensions: "20x15x10 cm",
            description: "High-quality noise-canceling wireless headphones with deep bass.",
            availability: true,
            image: ["https://example.com/headphones.jpg"]
        },
        {
            key: "P002",
            name: "LED Stage Light",
            price: "89.50",
            category: "Light",
            dimensions: "30x20x15 cm",
            description: "Bright and colorful LED stage light with multiple modes.",
            availability: true,
            image: ["https://example.com/stage-light.jpg"]
        },
        {
            key: "P003",
            name: "Bluetooth Speaker",
            price: "55.99",
            category: "Audio",
            dimensions: "12x8x5 cm",
            description: "Portable Bluetooth speaker with rich sound and deep bass.",
            availability: false,
            image: ["https://example.com/speaker.jpg"]
        },
        {
            key: "P004",
            name: "Smart LED Bulb",
            price: "25.00",
            category: "Light",
            dimensions: "6x6x10 cm",
            description: "WiFi-enabled smart LED bulb with voice control and color options.",
            availability: true,
            image: ["https://example.com/smart-bulb.jpg"]
        },
        {
            key: "P005",
            name: "Noise-Canceling Earbuds",
            price: "99.99",
            category: "Audio",
            dimensions: "5x5x2 cm",
            description: "Compact noise-canceling earbuds with long battery life.",
            availability: true,
            image: ["https://example.com/earbuds.jpg"]
        }
    ];
    
    const [items,setItems] = useState(sampleArray);
    
    return(
        <div className="w-full h-full relative">
            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    
                    {
                        items.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.key}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.dimensions}</td>
                                    <td>{item.availability}</td>
                                    <td>{item.description}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[50px] absolute right-2 bottom-2 hover:text-red-900"/>
            </Link>
        </div>
    )
}