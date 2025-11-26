import { IsString } from "class-validator";

export class UpdateAplicacaoDto {
  @IsString()
  component_tag?: string;

  @IsString()
  nome?: string;

  @IsString()
  id_time?: number;
}
