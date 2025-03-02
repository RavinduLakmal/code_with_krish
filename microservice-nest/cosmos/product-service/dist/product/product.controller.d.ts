import { ProdutService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { UpdateProductStatus } from './dto/update-product.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProdutService);
    create(productDto: ProductDto): Promise<Product | null>;
    fetch(id: any): Promise<Product | null>;
    fetchAll(): Promise<Product[]>;
    validateStock(id: any, quantity: number): Promise<{
        available: boolean;
        id: number;
        name: string;
        createdAt: Date;
        price: number;
        quantity: number;
        status: string;
    }>;
    updatePartFromObject(id: any, updateProductStatus: UpdateProductStatus): Promise<Product>;
    reduceTheStockByIdAndQTY(id: any, quantity: number): Promise<boolean>;
    availableStockById(id: any, quantity: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        price: number;
        quantity: number;
        status: string;
    }>;
}
