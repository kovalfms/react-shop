import Card from "../components/Card/Card";
import {useEffect, useState} from "react";
import axios from "axios";


const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get('https://628e3538a339dfef87a9b8cb.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            } catch (e) {
                console.error(e);
            }
        }

        fetchData()
    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1> My Orders</h1>
            </div>
            <div className="d-flex flex-wrap">
                {orders.map((item, i) => (
                    <Card
                        key={i}
                        {...item}
                    />)
                )}
            </div>
        </div>
    );
};

export default Orders;