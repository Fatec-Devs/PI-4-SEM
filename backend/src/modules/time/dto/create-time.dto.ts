import { IsNumber, IsString } from "class-validator";

export class CreateTimeDto {
  @IsString() 
  nome!: string;

  @IsNumber()
  id_grupo?: number;

  @IsString()
  pdl?: string;
}
