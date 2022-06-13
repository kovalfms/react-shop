import Card from "../components/Card/Card";
import {useContext} from "react";
import {AppContext} from "../App";


const Favorite = () => {
    const {favoriteItems, addToFavorite, addToCart} = useContext(AppContext);
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Favorites</h1>
            </div>
            <div className="d-flex flex-wrap">
                {favoriteItems.map((item, i) =>
                    <Card
                        key={i}
                        favorite
                        addToCart={addToCart}
                        onFavorite={addToFavorite}
                        {...item}
                    />
                )}
            </div>
        </div>
    );
};

export default Favorite;