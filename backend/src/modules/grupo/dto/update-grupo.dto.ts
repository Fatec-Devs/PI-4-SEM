import { IsString } from "class-validator";

export class UpdateGrupoDto {
  @IsString()
  nome?: string;
}
