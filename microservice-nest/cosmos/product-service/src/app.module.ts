import { Module } from '@nestjs/common';

import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductModule,TypeOrmModule.forRoot(
    {
      type:'mysql',
      host:process.env.HOSTNAME || 'localhost',
      port:3306,
      username:'root',
      password:'password',
      database:'cosmos',
      entities:[Product],
      synchronize:true // only for dev
    }
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}