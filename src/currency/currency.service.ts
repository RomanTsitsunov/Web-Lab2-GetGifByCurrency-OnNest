import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Currency } from './schemas/currency.schema';
import { Model } from 'mongoose';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Injectable()
export class CurrencyService {
    constructor(@InjectModel(Currency.name) private currencyModel: Model<Currency>) {

    }

    async getGifByCurrency() {
        let todayCurrency = await this.getCurrency("today");
        let yesterdayCurrency = await this.getCurrency("yesterday");
        let gif;
        if(todayCurrency > yesterdayCurrency) {
            gif = await this.getGif("rich");
        }
        else {
            gif = await this.getGif("broke");
        }
        return gif;
    }

    async getCurrency(options: string) {
        let d = 0;
        switch(options) {
            case "today": {
                d = 0;
                break;
            }
            case "yesterday": {
                d = -1;
                break;
            }
            default: {
                console.log("not an option");
                return 0;
            }
        }
        let rate: number;
        let data = new Date();
        let year = data.getFullYear();
        let month = ("0" + (data.getMonth() + 1)).slice(-2);
        let day = ("0" + data.getDate()).slice(-2);
        if(d != 0 && data.getDate() === 0) {
            month = ("0" + data.getMonth()).slice(-2);
            day = "27";
        }
        else if(d != 0) {
            day = ("0" + (data.getDate() - 1)).slice(-2);
        }
        let date = year + "-" + month + "-" + day;
        let response = await axios.get('https://openexchangerates.org/api/historical/'
        + date + '.json?app_id=b30155599cff472eaa00b6e9aec46345&base=USD&symbols=RUB')
        rate = response.data.rates.RUB;
        console.log(rate);
        this.saveCurrency("USD", "RUB", rate, date);
        return rate;
    }

    async getGif(tag: string) {
        let url: string;
        let response = await axios.get('https://api.giphy.com/v1/gifs/search' +
        '?api_key=8aY0SXbrmak3bMXIPUuALNu6t4OMKCuD&q=' + tag);
        let rand = Math.floor((Math.random() * 50));
        url = response.data.data[rand].url;
        console.log(url);
        return url;
    }

    async saveCurrency(base, target, rate, date) {
        const createCurrencyDto = new CreateCurrencyDto();
        createCurrencyDto.base="USD";
        createCurrencyDto.target="RUB";
        createCurrencyDto.values=rate;
        createCurrencyDto.date=date;

        const currency = new this.currencyModel(createCurrencyDto);
        return currency.save();
    }

}
