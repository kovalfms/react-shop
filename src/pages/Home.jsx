import React from 'react';
import Card from "../components/Card/Card";
import Loader from "../components/Loader/Loader";
import {useSelector} from "react-redux";
const Home = ({
                  isLoading,
                  searchValue,
                  setSearchValue,
                  addToFavorite,
                  addSearchValue,
                  addToCart
              }) => {

    const {items} = useSelector(state => state.balls)
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Search by "${searchValue}"` : 'All balls'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    <input
                        onChange={addSearchValue}
                        value={searchValue}
                        type="text"
                        placeholder="Search..."
                    />
                    {searchValue && <img className="cu-p" onClick={() => setSearchValue('')} src="/img/btn-remove.svg" alt="Clear"/>}
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {isLoading
                    ? [...Array(12)].map((_, i) => <Loader key={i}/>)
                    : items
                        .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((item) =>
                            <Card
                                {...item}
                                key={item.id}
                                addToCart={addToCart}
                                onFavorite={addToFavorite}
                                loading={isLoading}
                            />
                        )
                }
            </div>
        </div>

    );
};

export default Home;