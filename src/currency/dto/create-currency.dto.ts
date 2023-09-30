import { ApiProperty } from "@nestjs/swagger";

export class CreateCurrencyDto {
    @ApiProperty()
    base: string;
    @ApiProperty()
    target: string;
    @ApiProperty()
    values: number;
    @ApiProperty()
    date: string;
}