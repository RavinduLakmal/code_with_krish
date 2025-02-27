import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [CustomerModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:process.env.HOSTNAME || 'localhost',
    port:3306,
    username:'root',
    password:'password',
    database:'cosmos',
    entities:[Customer],
    synchronize:true // only for dev
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
