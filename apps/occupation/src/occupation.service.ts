import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Occupation } from "@app/shared/models/occupation.model";
import { RpcException } from "@nestjs/microservices";
import { DeleteOccupationDto } from "@app/shared/dtos/occupation-dto/deleteOccupation.dto";
import { CreateOccupationDto } from "@app/shared/dtos/occupation-dto/createOccupation.dto";
import { UpdateOccupationDto } from "@app/shared/dtos/occupation-dto/updateOccupation.dto";

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

  async updateOccupation(dto: UpdateOccupationDto) {
    const occupation = await this.occupationRepository.findOne({ where: { id: dto.id } });
    if (occupation) {
      return await this.occupationRepository.update(dto, { where: { id: dto.id } });
    } else {
      throw new RpcException(
        new NotFoundException("Такой профессии не существует!"));
    }
  }

  async deleteOccupation(dto: DeleteOccupationDto) {
    const occupation = await this.occupationRepository.findOne({ where: { name: dto.name } });
    if (occupation) {
      return await this.occupationRepository.destroy({ where: { id: occupation.id } });
    } else {
      throw new RpcException(
        new NotFoundException("Такой профессии не существует!"));
    }
  }
}
