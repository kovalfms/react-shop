const initialState = {
    cartItems: [],
    totalPrice: 0,
    orders: []
}

const GET_CART_ITEMS = 'GET_CART_ITEMS'
const GET_ORDERS = 'GET_ORDERS'
const ADD_TO_ORDERS = 'ADD_TO_ORDERS'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const REMOVE_ALL_CART_ITEMS = 'REMOVE_ALL_CART_ITEMS'
const ADD_TO_CART = 'ADD_TO_CART'
const GET_TOTAL_PRICE = 'GET_TOTAL_PRICE'

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_ITEMS:
            return {...state, cartItems: [...action.payload]};
        case ADD_TO_CART:
            return {...state, cartItems: [...state.cartItems, action.payload]};
        case GET_ORDERS:
            return {...state, orders: [...action.payload]};
        case ADD_TO_ORDERS:
            return {...state, orders: [...state.orders, action.payload]};
        case REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter(item => item.id !== action.payload)};
        case REMOVE_CART_ITEM:
            return {...state, cartItems: state.cartItems.filter(item => item.parentId !== action.payload)};
        case REMOVE_ALL_CART_ITEMS:
            return state.cartItems = {...state, cartItems: []};
        case GET_TOTAL_PRICE:
            return state.totalPrice = {
                ...state,
                totalPrice: state.cartItems.reduce((accum, obj) => Number(obj.price) + accum, 0)
            };
        default:
            return state
    }
}


export const removeCartItemAction = (payload) => ({type: REMOVE_CART_ITEM, payload})
export const removeItemAction = (payload) => ({type: REMOVE_ITEM, payload})
export const removeAllCartItemsAction = (payload) => ({type: REMOVE_ALL_CART_ITEMS, payload})
export const getCartItemsAction = (payload) => ({type: GET_CART_ITEMS, payload})
export const getTotalPriceAction = (payload) => ({type: GET_TOTAL_PRICE, payload})
export const getOrdersAction = (payload) => ({type: GET_ORDERS, payload})
export const addToOrdersAction = (payload) => ({type: ADD_TO_ORDERS, payload})
export const addToCartAction = (payload) => ({type: ADD_TO_CART, payload})