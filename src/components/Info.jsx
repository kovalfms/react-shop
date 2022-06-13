import React, {useContext} from 'react';
import {AppContext} from "../App";

const Info = ({title, description, img}) => {

    const {setShowCart} = useContext(AppContext)

    return (
        <div className="d-flex align-center justify-center flex-column flex">
            <h1>{title}</h1>
            <img height={120} width={120} src={img} alt="Empty Cart"/>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setShowCart(false)} className="greenBtn"><img src="/img/arrow_back.svg" alt="Arrow"/> Back
            </button>
        </div>
    );
};

export default Info;