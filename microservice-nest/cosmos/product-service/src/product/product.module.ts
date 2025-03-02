import { Module } from '@nestjs/common';
import { ProdutService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])], 
  providers: [ProdutService],
  controllers: [ProductController]
})
export class ProductModule {}
