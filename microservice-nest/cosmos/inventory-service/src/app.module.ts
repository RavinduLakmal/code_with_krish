import { Module } from '@nestjs/common';

import { ProdutsModule } from './produts/produts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './produts/entity/product.entity';

@Module({
  imports: [ProdutsModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port:3306,
    username:'root',
    password:'password',
    database:'cosmos',
    entities:[Product],
    synchronize:true // only for dev
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
