import { IsString } from "class-validator";

export class UpdateFuncionarioDto {
  @IsString()
  nome?: string;

  @IsString()
  username?: string;

  @IsString()
  senha?: string;

  @IsString()
  email?: string;
}
