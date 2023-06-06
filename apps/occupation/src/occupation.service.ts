import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Occupation } from "@app/shared/models/occupation.model";
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
    const getOccupation = await this.occupationRepository.findOne({
      where: { name: dto.name }
    });
    if (getOccupation) {
      throw new HttpException("Такая профессия уже есть", HttpStatus.BAD_REQUEST);
    } else {
      const createOccupation = await this.occupationRepository.create(dto);
      return createOccupation;
    }
  }

  async updateOccupation(dto: UpdateOccupationDto) {
    const occupation = await this.occupationRepository.update(dto, { where: { id: dto.id } });
    return occupation;
  }

  async deleteOccupation(dto: CreateOccupationDto) {
    const id = await this.occupationRepository.findOne({ where: { name: dto.name } });
    if (id) {
      const occupation = await this.occupationRepository.destroy({ where: { id: id.id } });
      return occupation;
    } else {
      throw new HttpException("Такой профессии не существует", HttpStatus.BAD_REQUEST);
    }
  }
}
