import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { EMAIL, FULL_ADDRESS, FULL_NAME, ORDER_SUBMIT } from "../Common/CommonConstants";
import classes from './ProductOrderSummary.module.scss';
import { Product } from "../../ApiServices/Models/Product";

function ProductOrderSummary(){
    const products=useSelector((state:RootState) => state.counter.filter(product=>product.name!=='totalItems'));
    const productElement=(product:Product)=>
        <div className={classes.product}>
            <span>{product.name}</span>
            <span>{product.quantity}</span>
        </div>;
    
    return (
    <div className={classes.productOrderSummaryContainer}>
        <form className={classes.formContainer}>
            <input required placeholder={FULL_NAME}></input>
            <input required placeholder={FULL_ADDRESS}></input>
            <input required placeholder={EMAIL}></input>
            <button>{ORDER_SUBMIT}</button>
        </form>
    {products.map(product=>productElement(product))}
    </div>);
}
export default ProductOrderSummary;