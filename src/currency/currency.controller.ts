import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {

    }

    @Get("exchangeCurrency")
    async exchangeCurrency() {
        return await this.currencyService.getGifByCurrency();
    }
}
