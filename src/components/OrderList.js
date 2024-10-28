import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../styles/OrderList.css'; // Import the CSS file

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [mailData, setMailData] = useState({
        message: "",
        subject: "",
        username: "",
    });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 5;
    const navigate = useNavigate();
    const role =  localStorage.getItem('role')

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const username = localStorage.getItem('username');
                const userRole = localStorage.getItem('role');
                const type = localStorage.getItem('list_type');
                console.log(type) ;
                const url = userRole === 'admin'
                    ? 'http://localhost:8000/api/users/admin/orders'
                    : 'http://localhost:8000/api/users/orders/';
                const params = userRole !== 'admin' ? { username } : { type };
                const response = await axios.get(url, { params });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const composeMailData = (order, action) => {
        const message = `
            <p>Dear <strong>${order.client}</strong>,</p>
            <p>Your Order with order number ${order.id} has been ${action} with your number one Tailor Shop.</p>
            <p><strong>Expected Delivery Date:</strong> ${order.expected_date}</p>
            <p><strong>Preferred Color:</strong> ${order.preferred_Color}</p>
            <p><strong>Event Type:</strong> ${order.event_type}</p>
            <p>Thanks for choosing <strong>JFK Tailor Shop</strong>.</p>
            <p>Best regards,<br/>JFK Tailor Shop</p>
        `;
        setMailData({
            message,
            subject: `Your Order (${order.id}) with JFK ${action}`,
            username: order.client,
        });
    };

    const sendNotificationEmail = async () => {
        try {
            await axios.post('http://localhost:8000/api/users/notifications/email', mailData);
        } catch (error) {
            console.error('Error sending email notification:', error);
        }
    };

    const handleConfirm = async () => {
        if (!selectedOrder) return;
        try {
            setLoading(true);
            await axios.post(`http://localhost:8000/api/users/orders/confirm/${selectedOrder.id}/`, {
                client: selectedOrder.client,
            });
            setOrders((prevOrders) =>
                prevOrders.map(order =>
                    order.id === selectedOrder.id ? { ...order, is_confirmed: true } : order
                )
            );

            console.log(selectedOrder.id)
            composeMailData(selectedOrder, 'confirmed');

            await sendNotificationEmail();
            setShowConfirmationModal(false);
        } catch (error) {
            console.error('Error confirming order:', error);
        } finally {
            setLoading(false);
            setSelectedOrder(null);
        }
    };

    const handleDelete = async () => {
        if (!selectedOrder) return;
        try {
            setLoading(true);
            await axios.post(`http://localhost:8000/api/users/orders/delete/${selectedOrder.id}/`);
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== selectedOrder.id));
            console.log(selectedOrder.id)
            composeMailData(selectedOrder, 'deleted');
            await sendNotificationEmail();
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting order:', error);
        } finally {
            setLoading(false);
            setSelectedOrder(null);
        }
    };

    const handleEdit = (orderId) => navigate(`/orders/edit/${orderId}`);

    const handleOpenConfirmModal = (order) => {
        setSelectedOrder(order);
        setShowConfirmationModal(true);
    };

    const handleOpenDeleteModal = (order) => {
        setSelectedOrder(order);
        setShowDeleteModal(true);
    };

    const handleback = () =>{
        if (role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/client-home');
        }
    }

    const pageCount = Math.ceil(orders.length / ordersPerPage);
    const offset = currentPage * ordersPerPage;
    const currentOrders = orders.slice(offset, offset + ordersPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <div className="page">
            <div className="container">
                <div className="actionButtons">
                    <button onClick={() => navigate('/neworders')} className="actionButton">
                        Place a New Order
                    </button>
                    <button onClick={() => handleback()} className="actionButton">
                        Go Back Home
                    </button>
                </div>
                <h2 className="heading">Your Orders</h2>
                {currentOrders.length > 0 ? (
                    <>
                        <ul className="orderList">
                            {currentOrders.map(order => (
                                <li key={order.id} className="orderItem">
                                    <p><strong>Order #{order.id}</strong> - Status: {order.status}</p>
                                    <p><strong>Order Date:</strong> {order.order_date}</p>
                                    <p><strong>Client:</strong> {order.client}</p>
                                    <p><strong>Event Type:</strong> {order.event_type}</p>
                                    <p><strong>Preferred Color:</strong> {order.preferred_Color}</p>
                                    <p><strong>Material on Us?</strong> {order.material ? "Yes" : "No"}</p>
                                    <p><strong>Preferred Color:</strong> {order.preferred_Color}</p>
                                    <p><strong>Measurements:</strong> {order.measurements}</p>
                                    <p><strong>Comments:</strong> {order.comments}</p>
                                    <p><strong>Confirmed:</strong> {order.is_confirmed ? "Yes" : "No"}</p>
                                        <div className="buttonGroup">
                                        {!order.is_confirmed && (
                                            <button className="button" onClick={() => handleOpenConfirmModal(order)}>
                                                Confirm Order
                                            </button>
                                        )}
                                        {!order.is_confirmed && (
                                        <button className="button" onClick={() => handleEdit(order.id)}>
                                            Edit
                                        </button>
                                        )}
                                        {!order.is_confirmed && (
                                        <button className="button" onClick={() => handleOpenDeleteModal(order)}>
                                            Delete
                                        </button>
                                    )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'paginationContainer'}
                            activeClassName={'activePage'}
                            pageClassName={'pageItem'}
                            previousClassName={'pageItem'}
                            nextClassName={'pageItem'}
                            disabledClassName={'disabledPage'}
                        />
                    </>
                ) : (
                    <p className="noOrders">No orders available.</p>
                )}

                {showConfirmationModal && (
                    <div className="modalOverlay">
                        <div className="modalContent">
                            <h3>Confirm Order</h3>
                            <p>Are you sure you want to confirm this order?</p>
                            <button className="confirmButton" onClick={handleConfirm}>
                                {loading ? 'Confirming...' : 'Yes, Confirm'}
                            </button>
                            <button className="closeButton" onClick={() => setShowConfirmationModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="modalOverlay">
                        <div className="modalContent">
                            <h3>Delete Order</h3>
                            <p>Are you sure you want to delete this order?</p>
                            <button className="confirmButton" onClick={handleDelete}>
                                {loading ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                            <button className="closeButton" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;
