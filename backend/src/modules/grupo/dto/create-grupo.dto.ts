import { IsString } from "class-validator";

export class CreateGrupoDto {
  @IsString()
  nome!: string;
}
