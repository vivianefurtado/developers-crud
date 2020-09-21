import { Model } from 'mongoose';
import { DeleteDeveloperDto, DevelopersDto } from '../dto/developers.dto';
import { PaginatedDevelopersResultDto } from '../dto/paginatedDevelopersResult.dto';
import { PageRequest } from '../interface/pageRequest';
import { Developers } from '../schemas/developers.schema';
import { DevelopersService } from '../services/developers.service';
import { DevelopersController } from './developers.controller';

describe('DevelopersController', () => {
  let developersController: DevelopersController;
  let developersService: DevelopersService;
  let model: Model<Developers>;

  const developer = {
    _id: '1001',
    nome: 'Viviane da Rocha Furtado',
    sexo: 'feminino',
    idade: 26,
    hobby: 'Correr',
    datanascimento: new Date('1994-03-11'),
  };

  beforeEach(async () => {
    developersService = new DevelopersService(model);
    developersController = new DevelopersController(developersService);
  });

  it('should be defined', () => {
    expect(developersController).toBeDefined();
    expect(developersService).toBeDefined();
  });

  it('shoud return an array of developers - findAll()', async () => {
    const data: DevelopersDto[] = [developer];

    jest
      .spyOn(developersService, 'findAll')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developersController.findAll()).toBe(data);
    expect(developersService.findAll).toHaveBeenCalledTimes(1);
  });

  it('shoud return an array of developers - findAllPaginated()', async () => {
    const data: PaginatedDevelopersResultDto = {
      content: [
        developer
      ],
      totalCount: 1
    };

    const query: PageRequest = {
      _id: '1001',
      nome: '',
      sexo: '',
      idade: 26,
      hobby: 'Correr',
      datanascimento: '',
      page: 0,
      size: 8
    }

    jest
      .spyOn(developersService, 'findAllPaginated')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developersController.findAllPaginated(query)).toBe(data);
    expect(developersService.findAllPaginated).toHaveBeenCalledTimes(1);
    expect(developersService.findAllPaginated).toBeCalledWith({
      _id: '1001',
      nome: '',
      sexo: '',
      idade: 26,
      hobby: 'Correr',
      datanascimento: '',
      page: 0,
      size: 8
    });
  });

  it('shoud return an object of developers - findById()', async () => {
    const data: DevelopersDto = developer;

    jest
      .spyOn(developersService, 'findById')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developersController.findById(data._id)).toBe(data);
    expect(developersService.findById).toHaveBeenCalledTimes(1);
    expect(developersService.findById).toBeCalledWith('1001')
  });

  it('shoud create a developer - createDeveloper()', async () => {
    const data: DevelopersDto = developer;

    jest
      .spyOn(developersService, 'create')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developersController.createDeveloper(data)).toBe(data);
    expect(developersService.create).toHaveBeenCalledTimes(1);
    expect(developersService.create).toBeCalledWith(
      developer
    )
  });

  it('shoud update a developer - updateDeveloper()', async () => {
    const data: DevelopersDto = {
      ... developer, 
      hobby: 'Correr e caminhar'
    };

    jest
      .spyOn(developersService, 'update')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developersController.updateDeveloper(data._id, data)).toBe(data);
    expect(developersService.update).toHaveBeenCalledTimes(1);
    expect(developersService.update).toBeCalledWith('1001', {
      ...developer,
      hobby: 'Correr e caminhar'
    })
  });

  it('shoud remove a developer - removeDeveloper()', async () => {
    const data: DeleteDeveloperDto = {
      ok: 1,
      n: 1
    };

    jest
      .spyOn(developersService, 'remove')
      .mockImplementation(() => Promise.resolve(data));

    expect(await developersController.removeDeveloper('1001')).toBe(data);
    expect(developersService.remove).toHaveBeenCalledTimes(1);
    expect(developersService.remove).toBeCalledWith('1001');
  });
});
