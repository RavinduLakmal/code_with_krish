import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, notification } from 'antd';
import type { TableColumnsType } from 'antd';
import { createProduct, productFetchAll } from '../service/ProductService';

interface Product {
    key: React.Key;
    name: string;
    quantity: number;
    price: number;
}



export const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await productFetchAll();
            console.log(data)

            setProducts(data);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    const createProductsOnFinish = async (values:any)=>{
        var obj={
            name:values.name,email:values.email, address:values.address
        }
        try{
            const newproducts = await createProduct(obj);
            notification.success({
                message: 'products Created',
                description: `products ${newproducts.name} has been successfully created.`,
            });
            fetchProducts();
        }catch(error){
            alert(error);
        }
    }

    const tColoumns : TableColumnsType<Product> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
    ]

    return (

        <div>
            <Form onFinish={createProductsOnFinish} layout="inline" style={{ marginBottom: '20px' }}>
            <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input placeholder="Product Name" />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    rules={[{ required: true, message: 'Please input the product quantity!' }]}
                >
                    <Input type="number" placeholder="Quantity" />
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[{ required: true, message: 'Please input the product price!' }]}
                >
                    <Input type="number" placeholder="Price" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Product
                    </Button>
                </Form.Item>
            </Form>

            {/* Product Table */}
            <Table<Product>
                columns={tColoumns}
                dataSource={products}
                loading={loading}
                rowKey="key"
            />
        </div>
    )

}