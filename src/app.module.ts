import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    CurrencyModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONDO_DB_URL}`)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
