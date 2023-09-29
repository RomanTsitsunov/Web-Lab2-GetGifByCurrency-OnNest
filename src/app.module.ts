import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [CurrencyModule, MongooseModule.forRoot('mongodb://localhost:27017/ExchangeCurrency')],
  controllers: [],
  providers: [],
})
export class AppModule {}
