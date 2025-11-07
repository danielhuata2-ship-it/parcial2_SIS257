import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateProgramaDto {
    @ApiProperty()
    @IsDefined({ message: 'El campo id de nivel academico debe estar definido' })
    @IsInt({ message: 'El campo id de nivel academico debe ser un numero entero' })
    idNivelAcademico: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre no debe estar vacío' })
    @IsString({ message: 'El campo nombre debe ser de tip cadena' })
    @MaxLength(100, { message: 'El campo nombre no debe exceder los 100 caracteres' })
    @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
    nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion no debe estar vacío' })
    @IsString({ message: 'El campo descripcion debe ser de tip cadena' })
    @MaxLength(2000, { message: 'El campo descripcion no debe exceder los 2000 caracteres' })
    @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
    descripcion: string;

    @ApiProperty()
    @IsDefined({ message: 'El campo version debe estar definido' })
    @IsInt({ message: 'El campo version debe ser un número entero' })
    @Min(0, { message: 'El campo version no puede ser negativo' })
    version: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo duración meses debe estar definido' })
    @IsInt({ message: 'El campo duración meses debe ser un número entero' })
    @Min(0, { message: 'El campo duración meses no puede ser negativo' })
    duracionMeses: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo costo debe estar definido' })
    @IsNumber({ maxDecimalPlaces: 5 }, { message: 'El campo costo debe ser numérico con máximo cinco decimales' })
    @Type(() => Number)
    @Min(0, { message: 'El campo costo no puede ser negativo' })
    costo: number;

    @ApiProperty()
    @IsDefined({ message: 'El campo fecha de inicio debe estar definido' })
    @IsDateString({}, { message: 'El campo fecha de inicio debe ser una fecha válida' })
    fechaInicio: Date;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo estado no debe estar vacío' })
    @IsString({ message: 'El campo estado debe ser de tipo cadena' })
    @IsEnum(['En Planificación', 'En curso', 'Finalizado'])
    estado: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo area conocimiento no debe estar vacío' })
    @IsString({ message: 'El campo area conocimiento debe ser de tip cadena' })
    @MaxLength(100, { message: 'El campo area conocimiento no debe exceder los 1000 caracteres' })
    @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
    area_conocimiento:string 
}
