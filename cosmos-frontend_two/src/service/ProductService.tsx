import axios from "axios";

export const createProduct = async (  obj: any) =>{
    try {
        const response = await axios.post('http://localhost:3001/products', obj);
        return response.data; 
      } catch (error) {
        console.error('Products Creating has a error:', error);
        throw error; 
      }
}

export const productFetchAll = async (): Promise<any> =>{
    try{
        const resp = await fetch('http://localhost:3001/products'); 
        if (!resp.ok) {
            throw new Error('fetch Products was gailed');
        }
        const data = await resp.json();
        return data; 
    }catch (error) {
        console.error('Products Fetching has a error:', error);
        throw error;   
      }
}