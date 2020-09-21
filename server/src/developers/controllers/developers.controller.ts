import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { DeleteDeveloperDto, DevelopersDto } from '../dto/developers.dto';
import { PaginatedDevelopersResultDto } from '../dto/paginatedDevelopersResult.dto';
import { PageRequest } from '../interface/pageRequest';
import { DevelopersService } from '../services/developers.service';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  async findAll(): Promise<DevelopersDto[]> {
    return this.developersService.findAll();
  }

  @Get('paginated')
  async findAllPaginated(@Query() query: PageRequest): Promise<PaginatedDevelopersResultDto> {
    return this.developersService.findAllPaginated(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<DevelopersDto> {
    return this.developersService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async createDeveloper(@Body() developer: DevelopersDto): Promise<DevelopersDto> {
    return this.developersService.create(developer);
  } 

  @Put(':id')
  async updateDeveloper(@Param('id') id: string, 
  @Body() developer): Promise<DevelopersDto> {
    return this.developersService.update(id, developer);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeDeveloper(@Param('id') id: string): Promise<DeleteDeveloperDto> {
    return this.developersService.remove(id);
  }
}
