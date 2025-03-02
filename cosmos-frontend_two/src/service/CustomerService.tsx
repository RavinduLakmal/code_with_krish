import axios from "axios";

export const createCustomer = async (  obj: any) =>{
    try {
        const response = await axios.post('http://localhost:3002/customer', obj);
        return response.data; 
      } catch (error) {
        console.error('Customer Creating has a error:', error);
        throw error; 
      }
}

export const customerFetchAll = async (): Promise<any> =>{
    try{
        const resp = await fetch('http://localhost:3002/customer'); 
        if (!resp.ok) {
            throw new Error('fetch customers was gailed');
        }
        const data = await resp.json();
        return data; 
    }catch (error) {
        console.error('Customer Fetching has a error:', error);
        throw error; 
      }
}