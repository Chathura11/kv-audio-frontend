import "./productCard.css";

export default function ProductCard(props){
    return(
        <div className="product-card">
            <img src={props.image}/>
            <span>{props.name}</span>
            <span>{props.price}</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, necessitatibus.</p>
        </div>
    )
}