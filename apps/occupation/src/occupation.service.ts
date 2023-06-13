import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Occupation} from "@app/shared/models/occupation.model";
import {RpcException} from "@nestjs/microservices";
import {CreateOccupationDto} from "@app/shared/dtos/occupation-dto/createOccupation.dto";

@Injectable()
export class OccupationService {
  constructor(@InjectModel(Occupation) private occupationRepository: typeof Occupation) {
  }

  async getAllOccupation() {
    const occupation = await this.occupationRepository.findAll();
    return occupation;
  }

  async createOccupation(dto: CreateOccupationDto) {
    const checkOccupation = await this.occupationRepository.findOne({
      where: { name: dto.name }
    });
    if (checkOccupation) {
      throw new RpcException(
        new NotFoundException("Такая профессия уже есть!"));
    } else {
      const createOccupation = await this.occupationRepository.create(dto);
      return createOccupation;
    }
  }

  async updateOccupation(dto: CreateOccupationDto, id: number) {
    const occupation = await this.occupationRepository.update(dto, { where: { id: id } });
    if (occupation) {
      return occupation
    } else {
      throw new RpcException(
        new NotFoundException("Такой профессии не существует!"));
    }
  }

  async deleteOccupation(id: number) {
    const occupation = await this.occupationRepository.destroy({ where: { id: id } });
    if (occupation) {
      return occupation
    } else {
      throw new RpcException(
        new NotFoundException("Такой профессии не существует!"));
    }
  }
}
