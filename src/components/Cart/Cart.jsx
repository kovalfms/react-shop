import React, {useState} from 'react';
import classes from './Cart.module.scss'
import axios from "axios";
import Info from "../Info";
import {useDispatch, useSelector} from "react-redux";
import {removeAllCartItemsAction} from "../../redux/reducers/cartReducer";
import {fetchDeleteItem} from "../../redux/asyncActions/cart";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Cart = ({onClose, onRemove}) => {
    const {cartItems, totalPrice} = useSelector(state => state.cart)
    const [orderComplete, setOrderComplete] = useState(false)
    const [orderId, setOrderId] = useState(null)
    console.log(cartItems)
    const dispatch = useDispatch()

    const onClickOrder = async () => {
        try {
            const {data} = await axios.post('https://628e3538a339dfef87a9b8cb.mockapi.io/orders', {
                items: cartItems
            })
            setOrderId(data.id)
            dispatch(removeAllCartItemsAction())
            setOrderComplete(true)

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await dispatch(fetchDeleteItem(item.id))
                await delay(1000)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="overlay">
            <div className={classes.drawer}>
                <h2 className="d-flex mb-30 justify-between">
                    Cart
                    <img onClick={onClose} className="removeBtn mr-15 cu-p" width={32} height={32}
                         src="/img/btn-remove.svg"
                         alt="Remove"/>
                </h2>
                <div className={classes.cart}>
                    {cartItems.length > 0
                        ? (<div className={classes.items}>
                            {cartItems.map((item, i) =>
                                <div key={i} className="cartItem d-flex align-center mb-20">
                                    <img className="m-15" width={70} height={70} src={item.img} alt=""/>
                                    <div key={item.id} className="mr-20">
                                        <p className="mb-5">{item.title}</p>
                                        <b>{item.price} $</b>
                                    </div>
                                    <img onClick={() => onRemove(item.id)} className="removeBtn mr-15" width={32}
                                         height={32} src="/img/btn-remove.svg" alt="Remove"/>
                                </div>
                            )}
                            <div className={classes.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Total:</span>
                                        <div/>
                                        <b>{totalPrice}</b>
                                    </li>
                                    <li>
                                        <span>Tax 10%:</span>
                                        <div/>
                                        <b>{Math.floor(totalPrice * 0.1)} </b>
                                    </li>
                                </ul>
                                <button
                                    onClick={onClickOrder}
                                    className="greenBtn"> Checkout
                                    <img src="/img/arrow.svg" alt="Arrow"/>
                                </button>
                            </div>
                        </div>)
                        : (
                            <Info
                                title={orderComplete ? "Your order has been processed =)" : "CART IS EMPTY"}
                                img={orderComplete ? "/img/order.jpg" : "/img/empty_cart.png"}
                                description={orderComplete ? `Your order #${orderId} will be processed. Our operator will contact you shortly` : "Please, choose a product =)"}
                            />
                        )}
                </div>
            </div>
        </div>

    );
};

export default Cart;
