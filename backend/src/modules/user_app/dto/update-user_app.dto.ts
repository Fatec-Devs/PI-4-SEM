import { IsString } from "class-validator";

export class UpdateUserAppDto {
  
  @IsString()
  username?: string;

  @IsString()
  senha?: string;

  @IsString()
  matricula_funcionario?: string;
}
