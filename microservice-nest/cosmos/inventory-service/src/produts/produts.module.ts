import { Module } from '@nestjs/common';
import { ProdutsService } from './produts.service';
import { ProdutsController } from './produts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])], 
  providers: [ProdutsService],
  controllers: [ProdutsController]
})
export class ProdutsModule {}
