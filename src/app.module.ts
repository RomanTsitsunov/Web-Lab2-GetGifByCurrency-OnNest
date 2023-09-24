import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyController } from './currency/currency.controller';
import { CurrencyService } from './currency/currency.service';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [CurrencyModule],
  controllers: [AppController, CurrencyController],
  providers: [AppService, CurrencyService],
})
export class AppModule {}
