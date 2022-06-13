import React, {useContext} from 'react';
import classes from './Card.module.scss'
import {useState} from "react";
import {AppContext} from "../../App";

const Card = ({
                  id,
                  title,
                  price,
                  img,
                  addToCart,
                  onFavorite,
                  favorite = false,
              }) => {

    const [isFavorite, setFavorite] = useState(favorite)
    const {hasCartItem} = useContext(AppContext)

    const onClickPlus = () => {
        addToCart({id, parentId: id, title, price, img});
    }
    const onClickFavorite = () => {
        onFavorite({id, parentId: id, title, price, img})
        setFavorite(!isFavorite)
    }
    return (
        <div className={classes.card}>
            {onFavorite &&
                <img onClick={onClickFavorite} className="favorite cu-p"
                     src={isFavorite ? "/img/heart_like.svg" : "/img/heart_unliked.svg"} alt="Heart unliked"/>
            }
            <img width={150} height={150} src={img} alt="cart-img"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column mt-30">
                    <span>Price</span>
                    <b>{price} ₴</b>
                </div>
                {addToCart &&
                    <img className="cu-p" onClick={onClickPlus} width={32} height={32}
                         src={hasCartItem(id) ? "/img/plus-added.svg" : "/img/plus.svg"} alt="Plus"/>
                }

            </div>
        </div>
    );
};

export default Card;