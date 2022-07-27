import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class getUsersDTO {
    @ApiPropertyOptional({
        example: "1",
        description: "default 1"
    })
    @IsString()
    page: string
    @ApiPropertyOptional({
        example: "10",
        description: "default 10"
    })
    @IsString()
    limit: string
    @ApiPropertyOptional()
    @IsString()
    search: string
    @ApiPropertyOptional({
        example: "desc"
    })
    @IsString()
    sort: string
    @ApiPropertyOptional({
        example: "false"
    })
    @IsString()
    secure: string
}

export class getUserDTO {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    username: string
}

export class InsertUserDTO {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    username: string
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    name: string
}

export class InsertPasswordDTO {
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    username: string
    @ApiProperty()
    @IsString()
    @MaxLength(100)
    password: string
}
