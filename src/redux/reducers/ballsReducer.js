
const initialState = {
    items: [],
    favoriteItems: [],
}

const GET_ITEMS = 'GET_ITEMS'
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITE'
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'
const GET_FAVORITES = 'GET_FAVORITES'


export const ballsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {...state, items: [...action.payload]};
        case ADD_TO_FAVORITES:
            return {...state, favoriteItems: [...state.favoriteItems, action.payload]};
        case REMOVE_FROM_FAVORITES:
            return {...state, favoriteItems: state.favoriteItems.filter(item => item.id !== action.payload)}
        case GET_FAVORITES:
            return {...state, favoriteItems: [...action.payload]};
        default:
            return state
    }
}

export const getItemsAction = (payload) => ({type: GET_ITEMS, payload})
export const getFavoriteItemsAction = (payload) => ({type: GET_FAVORITES, payload})
export const addItemsToFavoritesAction = (payload) => ({type: ADD_TO_FAVORITES, payload})
export const removeItemFromFavoritesAction = (payload) => ({type: REMOVE_FROM_FAVORITES, payload})