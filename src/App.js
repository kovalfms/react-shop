import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Orders from "./pages/Orders";

export const AppContext = createContext({})

function App() {
    const [items, setItems] = useState([])
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [favoriteItems, setFavoriteItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const resCartItems = await axios.get('https://628e3538a339dfef87a9b8cb.mockapi.io/cart')
                const resFavoriteItems = await axios.get('https://628e3538a339dfef87a9b8cb.mockapi.io/favorite')
                const resItems = await axios.get('https://628e3538a339dfef87a9b8cb.mockapi.io/items')

                setIsLoading(false)

                setCartItems(resCartItems.data)
                setFavoriteItems(resFavoriteItems.data)
                setItems(resItems.data)
            } catch (e) {
                console.error(e)
            }


        }

        fetchData()
    }, [])

    const addToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => item.parentId === obj.id)
            if (findItem) {
                setCartItems((prev) => prev.filter(item => item.parentId !== obj.id))
                await axios.delete(`https://628e3538a339dfef87a9b8cb.mockapi.io/cart/${findItem.id}`);
            } else {
                const {data} = await axios.post(`https://628e3538a339dfef87a9b8cb.mockapi.io/cart`, obj);
                setCartItems((prev) => [...prev, data])

            }
        } catch (e) {
            console.error(e);
        }
    }

    const onRemoveItem = async (id) => {
        console.log(id)
        try {
            await axios.delete(`https://628e3538a339dfef87a9b8cb.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter(item => item.id !== id))
        } catch (e) {
            console.error(e);
        }

    }

    const addToFavorite = async (obj) => {
        try {
            if (favoriteItems.find((favObj) => favObj.id === obj.id)) {
                await axios.delete(`https://628e3538a339dfef87a9b8cb.mockapi.io/favorite/${obj.id}`)
                setFavoriteItems(prev => prev.filter(favObj => favObj.id !== obj.id))

            } else {
                const {data} = await axios.post('https://628e3538a339dfef87a9b8cb.mockapi.io/favorite', obj);
                setFavoriteItems(prev => [...prev, data])
            }
        } catch (e) {
            console.error(e);
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
            items,
            favoriteItems,
            hasCartItem,
            addToCart,
            addToFavorite,
            setShowCart,
            cartItems,
            setCartItems
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
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            setFavoriteItem={setFavoriteItems}
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
