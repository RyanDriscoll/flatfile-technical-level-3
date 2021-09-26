import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from '../entities/Card'
import { Repository } from 'typeorm'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>
  ) {}

  create({ sectionId, title }: { sectionId: number; title: string }): Promise<CardEntity> {
    let card = new CardEntity()
    card.title = title
    card.section_id = sectionId
    return this.cardsRepository.save(card)
  }

  async update({
    id,
    sectionId,
    title,
    description,
  }: {
    id: number
    sectionId: number
    title: string
    description: string
  }): Promise<CardEntity> {
    const card = await this.cardsRepository.findOne({ where: { id } })
    card.title = title
    card.section_id = Number(sectionId)
    card.description = description
    return this.cardsRepository.save(card)
  }
}
