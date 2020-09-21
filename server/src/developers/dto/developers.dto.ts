export class DevelopersDto {
  _id: string;
  nome: string;
  sexo: string;
  idade: number;
  hobby: string;
  datanascimento: Date;
}

export class DeleteDeveloperDto {
  ok?: number;
  n?: number;
}