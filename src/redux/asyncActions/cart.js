import axios from "axios";
import {
    addToCartAction,
    addToOrdersAction,
    getCartItemsAction,
    getOrdersAction,
    getTotalPriceAction,
    removeCartItemAction, removeItemAction
} from "../reducers/cartReducer";

export const fetchCart = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('https://628e3538a339dfef87a9b8cb.mockapi.io/cart')
            await dispatch(getCartItemsAction(data))
            await dispatch(getTotalPriceAction(data.price))
        } catch (e) {
            console.error(e)
        }
    }
}
export const fetchAddToCart = (obj) => {
    return async dispatch => {
        try {
            await axios.post(`https://628e3538a339dfef87a9b8cb.mockapi.io/cart`, obj);
            await dispatch(addToCartAction(obj))
            await dispatch(getTotalPriceAction())
            console.log(obj)
        } catch (e) {
            console.error(e)
        }
    }
}
export const fetchDeleteItem = (id) => {
    return async dispatch => {
        try {
            await axios.delete(`https://628e3538a339dfef87a9b8cb.mockapi.io/cart/${id}`);
            await dispatch(removeItemAction(id))
            await dispatch(getTotalPriceAction())
            console.log(id)
        } catch (e) {
            console.error(e)
        }
    }
}
export const fetchDeleteCartItem = (id) => {
    return async dispatch => {
        try {
            await axios.delete(`https://628e3538a339dfef87a9b8cb.mockapi.io/cart/${id}`);
            await dispatch(removeCartItemAction(id))
            await dispatch(getTotalPriceAction())
            console.log(id)
        } catch (e) {
            console.error(e)
        }
    }
}

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('https://628e3538a339dfef87a9b8cb.mockapi.io/orders');
            await dispatch(getOrdersAction(data.reduce((prev, obj) => [...prev, ...obj.items], [])))
        } catch (e) {
            console.error(e)
        }
    }
}
export const fetchAddToOrders = () => {
    return async dispatch => {
        try {
            const {data} = await axios.post('https://628e3538a339dfef87a9b8cb.mockapi.io/orders', {
                items: getCartItemsAction()
            });
            await dispatch(addToOrdersAction(data.id))
            await dispatch(removeCartItemAction())
        } catch (e) {
            console.error(e)
        }
    }
}