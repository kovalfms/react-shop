import React from 'react';
import classes from './Header.module.scss'
import {Link} from "react-router-dom";

import {useSelector} from "react-redux";

const Header = ({onShowCart}) => {
    const {totalPrice } = useSelector(state => state.cart)
    return (
        <div className={classes.header}>
            <header className="d-flex justify-between align-center p-40">
                    <Link to="/">
                        <div className="d-flex align-center">
                            <img width={50} height={50} src="/img/logo.png" alt="logo"/>
                            <div className="headerInfo">
                                <h3 className="text-uppercase">Balls UA</h3>
                                <p>The best soccer balls</p>
                            </div>
                        </div>
                    </Link>
                <div className="headerRight">
                    <ul className="d-flex">
                        <li onClick={onShowCart}>
                            <img src="/img/cart.svg" alt="Cart"/>
                            <b className="mr-15">{totalPrice} ₴</b>
                        </li>
                        <Link to="/favorite">
                            <li>
                                <img src="/img/favorite.svg" alt="Favorite"/>
                            </li>
                        </Link>
                        <Link to="/orders">
                            <li>
                                <img src="/img/profile.svg" alt="Profile"/>
                            </li>
                        </Link>

                    </ul>
                </div>
            </header>
        </div>

    );
};

export default Header;