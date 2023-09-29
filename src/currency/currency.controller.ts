import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {

    }

    @Get("exchangeCurrency")
    async exchangeCurrency() {
        return await this.currencyService.getGifByCurrency();
    }
}
