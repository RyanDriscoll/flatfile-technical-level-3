import { Body, Controller, Logger, Post, Put } from '@nestjs/common'
import { CardEntity } from '../entities/Card'
import { CardsService } from './cards.service'

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name)

  constructor(private cardsService: CardsService) {}

  @Post()
  addCard(@Body() card: { sectionId: number; title: string }): Promise<CardEntity> {
    this.logger.log('POST /cards')

    return this.cardsService.create(card)
  }

  @Put()
  updateCard(
    @Body() card: { id: number; sectionId: number; title: string; description: string }
  ): Promise<CardEntity> {
    this.logger.log(`PUT /cards/${card.id}`)

    return this.cardsService.update(card)
  }
}
