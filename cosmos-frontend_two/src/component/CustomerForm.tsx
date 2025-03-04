import React from 'react';
import {  Form, Input, Button, notification } from 'antd';
import { createCustomer } from '../service/CustomerService';



export const CustomerForm = () => {


    const createCustomerOnFinish = async (values:any)=>{
        var obj={
            name:values.name,email:values.email, address:values.address
        }
        try{
            await createCustomer(obj);
            // {fetchCustomer}
            notification.success({
                message: 'Customer Created',
                description: 'Customer has been successfully created.',
            });
        }catch(error){
            alert(error);
        }
    }



    return (

        <div>
            <Form onFinish={createCustomerOnFinish} layout="inline" style={{ marginBottom: '20px' }}>
                <Form.Item name="name" rules={[{required:true,message:"Name is important"}]}>
                    <Input placeholder="Name"/>
                </Form.Item>

                <Form.Item name="email" rules={[{required:true,message:"Email is important"}]}>
                    <Input placeholder="Email"/>
                </Form.Item>

                <Form.Item name="address" rules={[{required:true,message:"Address is important"}]}>
                    <Input placeholder="Address"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Customer
                    </Button>
                </Form.Item>

               
            </Form>
        </div>
    )

}