import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ImageEntity } from '../entities/Image'

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private imagesRepository: Repository<ImageEntity>
  ) {}

  create({
    cardId,
    url,
    name,
  }: {
    cardId: number
    url: string
    name: string
  }): Promise<ImageEntity> {
    let image = new ImageEntity()
    image.url = url
    image.name = name
    image.card_id = cardId
    return this.imagesRepository.save(image)
  }
}
