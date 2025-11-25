import { IsString } from "class-validator";

export class CreateUserAppDto {
  
  @IsString()
  username!: string;

  @IsString()
  senha!: string;

  @IsString()
  matricula_funcionario?: string;
}
