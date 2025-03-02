import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { UpdateProductStatus } from './dto/update-product.dto';
export declare class ProdutService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    create(productDto: ProductDto): Promise<Product | null>;
    fetch(id: any): Promise<Product | null>;
    fetchAll(): Promise<Product[]>;
    updateProductStatus(id: number, updateStatus: UpdateProductStatus): Promise<Product>;
    validateStock(id: any, qty: any): Promise<{
        available: boolean;
        id: number;
        name: string;
        createdAt: Date;
        price: number;
        quantity: number;
        status: string;
    }>;
    reduceTheStock(id: any, qty: any): Promise<boolean>;
    availbleStockByIdWithQty(id: any, qty: any): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        price: number;
        quantity: number;
        status: string;
    }>;
}
