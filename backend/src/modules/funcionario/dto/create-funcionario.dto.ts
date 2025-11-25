import { IsString, IsOptional } from 'class-validator';

export class CreateFuncionarioDto {
  @IsString()
  matricula!: string;

  @IsString()
  nome!: string;

  @IsString()
  username!: string;

  @IsString()
  senha!: string;

  @IsOptional()
  @IsString()
  email?: string;
}
