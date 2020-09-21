import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevelopersController } from './controllers/developers.controller';
import { Developers, DevelopersSchema } from './schemas/developers.schema';
import { DevelopersService } from './services/developers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Developers.name, schema: DevelopersSchema}])
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService]
})
export class DevelopersModule {}
