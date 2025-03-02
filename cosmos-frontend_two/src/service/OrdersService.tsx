import axios from 'axios';

export const fetchAllOrders = async (): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:3006/orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const createOrder = async (orderDto: { customerId: number; items: any[] }) => {
    try {
        const response = await axios.post('http://localhost:3006/orders', orderDto);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};
