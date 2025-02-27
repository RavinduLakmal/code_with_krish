import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { UpdateProductStatus } from './dto/update-product.dto';
export declare class ProdutsService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    create(productDto: ProductDto): Promise<Product | null>;
    fetch(id: any): Promise<Product | null>;
    fetchAll(): Promise<Product[]>;
    updateProductStatus(id: number, updateStatus: UpdateProductStatus): Promise<Product>;
    validateStock(id: any, qty: any): Promise<{
        availabel: boolean;
        available?: undefined;
    } | {
        available: boolean;
        availabel?: undefined;
    }>;
}
