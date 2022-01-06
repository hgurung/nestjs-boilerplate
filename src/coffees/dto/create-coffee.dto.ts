import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class CreateCoffeeDto {

    @ApiProperty({
        description: 'Name of the coffee'
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: 'Brand of the coffee'
    })
    @IsString()
    readonly brand: string;

    @ApiProperty({
        example: []
    })
    @IsString({ each: true})
    readonly flavors: string[];
}
