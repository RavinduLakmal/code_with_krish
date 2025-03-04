import React, { useEffect, useState } from 'react';
import { Table,  } from 'antd';
import type { TableColumnsType } from 'antd';
import {  customerFetchAll } from '../service/CustomerService';
import { CustomerForm } from '../component/CustomerForm';

interface Customer {
    key: React.Key;
    name: string;
    email: string;
    address: string;
}


export const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const data = await customerFetchAll();
            console.log(data)

            setCustomers(data);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchCustomers();
    }, []);

    // const createCustomerOnFinish = async (values:any)=>{
    //     var obj={
    //         name:values.name,email:values.email, address:values.address
    //     }
    //     try{
    //         const newCustomer = await createCustomer(obj);
    //         notification.success({
    //             message: 'Customer Created',
    //             description: `Customer ${newCustomer.name} has been successfully created.`,
    //         });
    //         fetchCustomers();
    //     }catch(error){
    //         alert(error);
    //     }
    // }

    const tColoumns : TableColumnsType<Customer> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
    ]

    return (

        <div>
            {/* <Form onFinish={createCustomerOnFinish} layout="inline" style={{ marginBottom: '20px' }}>
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

                
            </Form> */}

            <CustomerForm />

            <Table<Customer>
                columns={tColoumns}
                dataSource={customers}
                loading={loading}
                rowKey="key"
            />
        </div>
    )

}



