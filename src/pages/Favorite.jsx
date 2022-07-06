import Card from "../components/Card/Card";
import {useSelector} from "react-redux";
import {AppContext} from "../App";
import {useContext} from "react";


const Favorite = () => {
    const { addToFavorite, addToCart} = useContext(AppContext)
    const {favoriteItems} = useSelector(state => state.balls);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Favorites</h1>
            </div>
            <div className="d-flex flex-wrap">
                {favoriteItems.map((item, i) =>
                    <Card
                        key={i}
                        {...item}
                        onFavorite={addToFavorite}
                        addToCart={addToCart}
                    />
                )}
            </div>
        </div>
    );
};

export default Favorite;