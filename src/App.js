import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import {createContext, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Orders from "./pages/Orders";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAddToFavorites,
    fetchAllBalls,
    fetchDeleteFromFavorites,
    fetchFavoritesBalls
} from "./redux/asyncActions/balls";
import {fetchAddToCart, fetchCart, fetchDeleteItem} from "./redux/asyncActions/cart";

export const AppContext = createContext({})

function App() {
    const dispatch = useDispatch()
    const {favoriteItems} = useSelector(state => state.balls)
    const {cartItems} = useSelector(state => state.cart)
    const [showCart, setShowCart] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchCart())
        dispatch(fetchFavoritesBalls())
        dispatch(fetchAllBalls())

        setIsLoading(false)

    }, [])

    const addToCart = async (obj) => {
        const findItem = cartItems.find((item) => item.parentId === obj.id)
        if (findItem) {
            // setCartItems((prev) => prev.filter(item => item.parentId !== obj.id))
            // await axios.delete(`https://628e3538a339dfef87a9b8cb.mockapi.io/cart/${findItem.id}`);
            dispatch(fetchDeleteItem(findItem.id))
        } else {
            dispatch(fetchAddToCart(obj))

        }
    }

    const onRemoveItem = (id) => {
        dispatch(fetchDeleteItem(id))
    }

    const addToFavorite = (obj) => {
        const findItem = favoriteItems.find((favObj) => favObj.id === obj.id)
        if (findItem) {
            dispatch(fetchDeleteFromFavorites(findItem.id))

        } else {
            dispatch(fetchAddToFavorites(obj))
        }

    }

    const addSearchValue = (e) => {
        setSearchValue(e.target.value)
    }

    const hasCartItem = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }

    return (
        <AppContext.Provider value={{
            hasCartItem,
            setShowCart,
            addToFavorite,
            addToCart
        }}>
            <div className="wrapper clear">
                {showCart &&
                    <Cart
                        onClose={() => setShowCart(false)}
                        onRemove={onRemoveItem}
                    />
                }
                <Header onShowCart={() => setShowCart(true)}/>
                <Routes>
                    <Route path="/" element={
                        <Home
                            isLoading={isLoading}
                            cartItems={cartItems}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            addToFavorite={addToFavorite}
                            addSearchValue={addSearchValue}
                            addToCart={addToCart}

                        />}
                    />

                    <Route path="/favorite" element={
                        <Favorite/>}
                    />
                    <Route path="/orders" element={<Orders/>}/>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
