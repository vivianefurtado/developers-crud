import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteDeveloperDto, DevelopersDto } from '../dto/developers.dto';
import { PaginatedDevelopersResultDto } from '../dto/paginatedDevelopersResult.dto';
import { PageRequest } from '../interface/pageRequest';
import { Developers } from '../schemas/developers.schema';

@Injectable()
export class DevelopersService {
  constructor(@InjectModel(Developers.name) private developersModel: Model<Developers>){}

  async findAll(): Promise<DevelopersDto[]> {
    return this.developersModel.find().exec();
  }

  async findAllPaginated(query: PageRequest): Promise<PaginatedDevelopersResultDto> {
    const totalCount = await this.developersModel.countDocuments({}).exec();

    const developers = await this.developersModel.find({}).skip(+query.size * +query.page).limit(+query.size).exec();

    if (totalCount === 0) {
      throw new HttpException('Não foi possível encontrar nenhum desenvolvedor.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (totalCount > 0) {
      return {
        content: developers,
        totalCount: totalCount,
      };
    }
  }

  async findById(id: string): Promise<DevelopersDto> {
    const developer = this.developersModel.findById(id).exec();

    if (developer){
      return developer;
    }
    
    throw new HttpException('Não foi possível encontrar nenhum desenvolvedor.',
    HttpStatus.NOT_FOUND);
  }

  async create(developersDto: DevelopersDto): Promise<DevelopersDto> {
    try{
      const createdDeveloper = new this.developersModel(developersDto);
      return createdDeveloper.save();
    } catch (error) {
      throw new HttpException('Não foi possível criar o desenvolvedor.',
      HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, developer: Developers): Promise<DevelopersDto> {
    try {
      return this.developersModel.findByIdAndUpdate({_id: id}, developer, { new: true });
    } catch (error) {
      throw new HttpException('Não foi possível atualizar o desenvolvedor.',
      HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<DeleteDeveloperDto> {
    try {
      return await this.developersModel.deleteOne({_id: id});
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
