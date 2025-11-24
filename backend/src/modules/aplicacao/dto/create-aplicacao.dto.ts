import { IsNumber, IsString, IsOptional } from "class-validator";

export class CreateAplicacaoDto {
  @IsString()
  component_tag!: string;

  @IsString()
  nome!: string;

  @IsNumber()
  @IsOptional()
  id_time?: number;
}
