import { Module } from '@nestjs/common';
import { ProdutService } from './product.service';
import { ProdutController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])], 
  providers: [ProdutService],
  controllers: [ProdutController]
})
export class ProductModule {}
