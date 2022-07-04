import axios from "axios";
import {
    addItemsToFavoritesAction,
    getFavoriteItemsAction,
    getItemsAction,
    removeItemFromFavoritesAction
} from "../reducers/ballsReducer";

export const fetchAllBalls = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('https://628e3538a339dfef87a9b8cb.mockapi.io/items')
            dispatch(getItemsAction(data))
        } catch (e) {
            console.error(e)
        }
    }
}

export const fetchFavoritesBalls = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('https://628e3538a339dfef87a9b8cb.mockapi.io/favorite')
            dispatch(getFavoriteItemsAction(data))
        } catch (e) {
            console.error(e)
        }
    }
}

export const fetchAddToFavorites = (obj) => {
    return async dispatch => {
        try {
            await axios.post('https://628e3538a339dfef87a9b8cb.mockapi.io/favorite', obj);
            dispatch(addItemsToFavoritesAction(obj))
        } catch (e) {
            console.error(e)
        }
    }
}

export const fetchDeleteFromFavorites = (obj) => {
    return async dispatch => {
        try {
            await axios.delete(`https://628e3538a339dfef87a9b8cb.mockapi.io/favorite/${obj.id}`)
            dispatch(removeItemFromFavoritesAction(obj.id))
        } catch (e) {
            console.log(e)
        }
    }
}