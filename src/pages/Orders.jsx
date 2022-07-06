import Card from "../components/Card/Card";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders} from "../redux/asyncActions/cart";


const Orders = () => {
        const {orders} = useSelector(state => state.cart)
        const total = orders.reduce((accum, obj) => Number(obj.price) + accum, 0)
        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(fetchOrders())
        }, [dispatch]);

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
                <h2>Total: {total} ₴</h2>
            </div>
        );
    }
;

export default Orders;