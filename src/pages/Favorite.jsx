import Card from "../components/Card/Card";
import {useSelector} from "react-redux";


const Favorite = () => {
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
                    />
                )}
            </div>
        </div>
    );
};

export default Favorite;