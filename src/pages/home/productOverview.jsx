import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imageSlider";
import {addToCart, loadCart} from '../../utils/cart';
import toast from "react-hot-toast";
import { Rating } from 'react-simple-star-rating'
import { MdDelete } from "react-icons/md";

export default function ProductOverView(){

    const params = useParams();
    const key = params.key;
    const [loadingState,setLoadingStatus] = useState('loading');
    const [product,setProduct] = useState({});
    const [reviews,setReviews] = useState([]);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [totalRating,setTotalRating] = useState(0);
    const [aveRating,setAveRating] = useState(0);
    const [fiveRating,setFiveRating] =useState(0);
    const [fourRating,setFourRating] =useState(0);
    const [threeRating,setThreeRating] =useState(0);
    const [twoRating,setTwoRating] =useState(0);
    const [oneRating,setOneRating] =useState(0);
    const [user,setUser] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const token = localStorage.getItem('token');

    useEffect(() => {
        LoadUser();
        LoadProduct();
    }, [loadingState])

    useEffect(() => {
        if (product.key) 
        {
            LoadReviews();
        }
    }, [product]);

    async function LoadUser(){
        await axios.get(backendUrl+'/api/users/',{headers:{
            Authorization:`Bearer ${token}`
        }}).then((result)=>{
            setUser(result.data);
          }).catch((error)=>{
            console.log(error)
          })
    }

    async function LoadProduct(){
        await axios.get(backendUrl+'/api/products/'+key).then((result)=>{
            setProduct(result.data);
            setLoadingStatus('loaded')
          }).catch((error)=>{
            setLoadingStatus('error')
          })
    }

    async function LoadReviews(){
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`).then((res)=>{
            setCurrentItemReviews(res.data);
          }).catch((error)=>{
            console.log(error)
          })
    }

    function setCurrentItemReviews(reviews){

        const filteredReviews = reviews.filter(review => review.product === product.key && review.isApproved);
        setReviews(filteredReviews);
        calTotalRating(filteredReviews);
    }

    function calTotalRating(reviews){
        let total = 0;
        let count = 0;

        let fiveCount = 0;
        let fourCount = 0;
        let threeCount = 0;
        let twoCount = 0;
        let oneCount = 0;

        reviews && reviews.map((review)=>{            
            total += parseInt(review.rating);
            count +=1; 

            if(parseFloat(review.rating) <= 5 && parseFloat(review.rating) > 4){
                fiveCount += 1;
            }
            else if(parseFloat(review.rating) <= 4 && parseFloat(review.rating) > 3){
                fourCount +=1;
            }
            else if(parseFloat(review.rating) <= 3 && parseFloat(review.rating) > 2){
                threeCount +=1;
            }
            else if(parseFloat(review.rating) <= 2 && parseFloat(review.rating) > 1){
                twoCount += 1;
            }
            else if(parseFloat(review.rating) <= 1 ){
                oneCount += 1;
            }

        })

        setTotalRating(total);
        total = total/count;
        setAveRating(total);
        
        setFiveRating(fiveCount);
        setThreeRating(threeCount);
        setFourRating(fourCount);
        setTwoRating(twoCount);
        setOneRating(oneCount);
        
    }

    const handleSubmitReview = () => {
        if (newRating === 0 || newComment.trim() === "") {
            toast.error("Please give a rating and a comment!");
            return;
        }
    
        const reviewData = {
            rating: newRating.toString(),
            comment: newComment,
            product:product.key,
            productName:product.name
        };
    
        axios.post(`${backendUrl}/api/reviews`, reviewData,{headers:{
            Authorization:`Bearer ${token}`
        }})
            .then(res => {
                toast.success("Review submitted!");
                setNewRating(0);
                setNewComment("");
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to submit review.");
            });
    };

    function deleteReview(email){
        const token = localStorage.getItem('token');
        console.log(token);
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`,{headers:{
            Authorization:`Bearer ${token}`
        }}
        ).then((res)=>{
            toast.success("Review deleted successfully!");
            setLoadingStatus('loading')
            
        }).catch((error)=>{
            setLoadingStatus('loading')
            toast.error("Failed to delete review!");
        })
    }
    
    

    return(
        <div className="w-full flex flex-col justify-center">
            {
                loadingState == 'loading' && 
                <div className="flex justify-center items-center mt-20">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            }
            {
                loadingState =='loaded' &&
                <div className="w-full h-full flex flex-col md:flex-row justify-center items-center">
                    <h1 className="text-2xl md:hidden my-6 font-bold text-accent text-center">{product.name}</h1>
                    <div className="w-full md:w-[49%]">
                        <ImageSlider images={product.image}/>
                    </div>
                    <div className="w-full md:w-[49%] p-2 flex flex-col items-center">
                        <h1 className="hidden md:block text-3xl font-bold text-accent">{product.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-800">{product.category} Category</h2>
                        <p className="text-gray-700 mt-4 text-center">{product.description}</p>
                        <p className="text-lg text-green-500 mt-4">Rs. {product.price.toFixed(2)}</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <span className="font-medium">Dimensions:</span>{product.dimensions}
                        </div>
                        <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md hover:bg-blue-900 cursor-pointer" onClick={()=>{
                            addToCart(product.key,1);
                            console.log(loadCart());
                            toast.success("Added to cart!")
                        }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            }
            {
                loadingState =='error' &&
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl font-bold text-accent">Error Occured</h1>
                </div>
            }
            <div className="py-12 px-12 flex flex-col">
                <h1 className="text-xl font-bold">Ratings & Reviews</h1>
                <div className="flex flex-col md:flex-row w-full mt-12 justify-star ">
                    <div className="flex flex-col w-full md:w-[30%]">
                        <div className="flex flex-row items-end">
                            <h1 className="text-6xl">{aveRating} </h1>
                            <h1 className="text-4xl text-gray-500"> /</h1>
                            <h1 className="text-4xl text-gray-500"> 5</h1>
                        </div>
                        <Rating
                            initialValue={ aveRating }
                            SVGclassName={'inline-block'}
                            iconsCount={ 5 }
                            allowFraction
                            readonly
                        />
                        <h1 className="text-gray-500">{totalRating} Ratings </h1>
                    </div>
                    <div className="w-full md:w-[30%] flex flex-col">
                        <div className="flex items-end">
                            <Rating
                                initialValue={ 5 }
                                size={25}
                                SVGclassName={'inline-block'}
                                iconsCount={ 5 }
                                allowFraction
                                readonly
                            />
                            <h1 className="text-[15px] ml-5">{fiveRating}</h1>
                        </div>
                        <div className="flex items-end">
                            <Rating
                                initialValue={ 4 }
                                size={25}
                                SVGclassName={'inline-block'}
                                iconsCount={ 5 }
                                allowFraction
                                readonly
                            />
                            <h1 className="text-[15px] ml-5">{fourRating}</h1>
                        </div>
                        <div className="flex items-end">
                            <Rating
                                initialValue={ 3 }
                                size={25}
                                SVGclassName={'inline-block'}
                                iconsCount={ 5 }
                                allowFraction
                                readonly
                            />
                            <h1 className="text-[15px] ml-5">{threeRating}</h1>
                        </div>
                        <div className="flex items-end">
                            <Rating
                                initialValue={ 2 }
                                size={25}
                                SVGclassName={'inline-block'}
                                iconsCount={ 5 }
                                allowFraction
                                readonly
                            />
                            <h1 className="text-[15px] ml-5">{twoRating}</h1>
                        </div>
                        <div className="flex items-end">
                            <Rating
                                initialValue={ 1 }
                                size={25}
                                SVGclassName={'inline-block'}
                                iconsCount={ 5 }
                                allowFraction
                                readonly
                            />
                            <h1 className="text-[15px] ml-5">{oneRating}</h1>
                        </div>
                        
                    </div>


                    <div className=" w-full md:w-[30%]">
                        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="mb-1 text-gray-700">Your Rating</h3>
                                <Rating
                                    onClick={setNewRating}
                                    initialValue={newRating}
                                    allowFraction
                                    size={25}
                                    SVGclassName="inline-block"
                                />
                            </div>

                            <div>
                                <h3 className="mb-1 text-gray-700">Your Comment</h3>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                    rows="4"
                                    placeholder="Write your thoughts here..."
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmitReview}
                                className="self-start bg-accent text-white px-5 py-2 rounded-md hover:bg-blue-900 transition cursor-pointer"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>

                <h1 className="text-[20px] mt-12">Item Reviews</h1>

                <div className="mt-12 space-y-6 relative">
                    {reviews.length === 0 && (
                        <p className="text-gray-500">No reviews yet. Be the first to rate this product!</p>
                    )}
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="flex items-start gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow relative"
                        >
                            <img
                                src={review.profilePicture}
                                alt={review.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex flex-col flex-1">
                                <div className="flex justify-between items-center mr-12">
                                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                                    <span className="text-xs text-gray-500">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <Rating
                                    initialValue={Number(review.rating)}
                                    readonly
                                    size={20}
                                    allowFraction
                                    fillColor="#ffd700"
                                    emptyColor="transparent"
                                    SVGclassName="inline-block"
                                />
                                <p className="text-gray-700 mt-2">{review.comment}</p>
                            </div>
                            {user.email === review.email &&
                                <div className="absolute right-0">
                                    <MdDelete className="hover:bg-white hover:text-red-500 rounded-full cursor cursor-pointer" onClick={()=>{
                                        deleteReview(review.email)
                                    }}/>
                                </div>
                            }
                        </div>
                    ))}

                    
                </div>
            </div>
        </div>
    )
}