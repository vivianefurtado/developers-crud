import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevelopersModule } from './developers/developers.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vivianefurtado:Y0bv21zVShYs4Pkk@cluster0.emdcd.mongodb.net/developers?retryWrites=true&w=majority'
      ),
    DevelopersModule
  ],
})
export class AppModule {}
