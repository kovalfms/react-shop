import React from 'react';
import ContentLoader from "react-content-loader";
import classes from "./Loader.module.scss"

const Loader = () => {
    return (
        <ContentLoader
            className={classes.cardLoading}
            speed={2}
            width={220}
            height={419}
            viewBox="0 0 150 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="9" ry="9" width="150" height="145" />
            <rect x="0" y="153" rx="3" ry="3" width="150" height="15" />
            <rect x="0" y="177" rx="3" ry="3" width="93" height="15" />
            <rect x="0" y="240" rx="8" ry="8" width="80" height="24" />
            <rect x="112" y="234" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
    );
};

export default Loader;