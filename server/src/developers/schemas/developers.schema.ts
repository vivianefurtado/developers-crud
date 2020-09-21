import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Developers extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  sexo: string;

  @Prop({ required: true })
  idade: number;

  @Prop({ required: true })
  hobby: string;

  @Prop({ required: true })
  datanascimento: Date;
}

export const DevelopersSchema = SchemaFactory.createForClass(Developers);