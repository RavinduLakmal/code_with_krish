import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, notification, Select } from 'antd';
import { fetchAllOrders, createOrder } from '../service/OrdersService';
import { customerFetchAll } from '../service/CustomerService';
import { productFetchAll } from '../service/ProductService';
import type { TableColumnsType } from 'antd';

interface OrderItem {
    productId: number;
    price: number;
    quantity: number;
}

interface Order {
    id: number;
    customerId: number;
    createdAt: string;
    status: string;
    items: OrderItem[];
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [customers, setCustomers] = useState<{ value: number; label: string }[]>([]);
    const [products, setProducts] = useState<{ value: number; label: string; price: number }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        fetchOrders();
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await fetchAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setLoading(false);
    };

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const data = await customerFetchAll();
            const formattedCustomers = data.map((customer: any) => ({
                value: customer.id,
                label: customer.name,
            }));
            setCustomers(formattedCustomers);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
        setLoading(false);
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await productFetchAll();
            const formattedProducts = data.map((product: any) => ({
                value: product.id,
                label: `${product.name} - RS${product.price}`,
                price: product.price,
            }));
            setProducts(formattedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    const handleCreateOrder = async (values: any) => {
        try {
            const newOrder = await createOrder({ customerId: values.customerId, items: orderItems });
            notification.success({
                message: 'Order Created',
                description: `Order for customer ${newOrder.customerId} has been successfully placed.`,
            });
            fetchOrders();
            setOrderItems([]); 
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to create order. Please try again.',
            });
        }
    };

    const addOrderItem = () => {
        setOrderItems([...orderItems, { productId: products[0]?.value || 0, price: products[0]?.price || 0, quantity: 1 }]);
    };

    const updateOrderItem = (index: number, field: string, value: any) => {
        const updatedItems = [...orderItems];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setOrderItems(updatedItems);
    };

    const columns: TableColumnsType<Order> = [
        { title: 'Order ID', dataIndex: 'id', key: 'id' },
        { title: 'Customer ID', dataIndex: 'customerId', key: 'customerId' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Items',
            dataIndex: 'items',
            key: 'items',
            render: (items: OrderItem[]) => (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            Product {item.productId} - Quantity: {item.quantity} - {item.price}
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    const calculation=(value: number,index: number)=>{
        const selectedProduct = products.find((p) => p.value === value);
                                updateOrderItem(index, 'productId', value);
                                updateOrderItem(index, 'price', selectedProduct?.price || 0);
    }

    return (
        <div>
            <h2>Create New Order</h2>
            <Form onFinish={handleCreateOrder} layout="vertical">

                <Form.Item
                    name="customerId"
                    rules={[{ required: true, message: 'Please select a customer!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a customer"
                        options={customers}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>

                {orderItems.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <Select
                            style={{ width: 200 }}
                            value={item.productId}
                            onChange={(value) => 
                                calculation(value,index)
                            }
                            options={products}
                        />
                        <Input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            disabled
                        />
                        <Input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            min={1}
                            onChange={(e) => updateOrderItem(index, 'quantity', Number(e.target.value))}
                        />
                    </div>
                ))}

                <Button type="dashed" onClick={addOrderItem} style={{ marginBottom: '10px' }}>
                    Add Item
                </Button>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Place Order
                    </Button>
                </Form.Item>
            </Form>

            <h2>Orders List</h2>
            <Table<Order> columns={columns} dataSource={orders} loading={loading} rowKey="id" />
        </div>
    );
};

export default Orders;
