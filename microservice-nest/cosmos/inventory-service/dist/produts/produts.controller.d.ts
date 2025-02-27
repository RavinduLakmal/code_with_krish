import { ProdutsService } from './produts.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { UpdateProductStatus } from './dto/update-product.dto';
export declare class ProdutsController {
    private productService;
    constructor(productService: ProdutsService);
    create(customerDto: ProductDto): Promise<Product | null>;
    fetch(id: any): Promise<Product | null>;
    fetchAll(): Promise<Product[]>;
    validateStock(id: any, quantity: number): Promise<{
        availabel: boolean;
        available?: undefined;
    } | {
        available: boolean;
        availabel?: undefined;
    }>;
    updatePartFromObject(id: any, updateProductStatus: UpdateProductStatus): Promise<Product>;
}
