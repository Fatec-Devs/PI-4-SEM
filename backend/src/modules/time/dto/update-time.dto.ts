import { IsString } from "class-validator";

export class UpdateTimeDto {
 
  @IsString()
  nome?: string;

  @IsString()
  id_grupo?: number;

  @IsString()
  pdl?: string;
}
