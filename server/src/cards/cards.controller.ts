import { Body, Controller, Logger, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { diskStorage } from 'multer'
import { FilesInterceptor } from '@nestjs/platform-express'
import { CardEntity } from '../entities/Card'
import { CardsService } from './cards.service'
import { editFileName, imageFileFilter } from '../utils/image-upload.utils'
import { ImagesService } from '../images/images.service'

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name)

  constructor(private cardsService: CardsService, private imagesService: ImagesService) {}

  @Post()
  addCard(@Body() card: { sectionId: number; title: string }): Promise<CardEntity> {
    this.logger.log('POST /cards')

    return this.cardsService.create(card)
  }

  @Put()
  @UseInterceptors(
    FilesInterceptor('file', 3, {
      storage: diskStorage({
        destination: './src/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async updateCard(
    @Body() card: { id: number; sectionId: number; title: string; description: string },
    @UploadedFiles() files
  ): Promise<CardEntity> {
    this.logger.log(`PUT /cards/${card.id}`)

    const [existingImages, existingImagesCount] = await this.imagesService.getAllForCard(card.id)

    const remainingImagesAllowed = 3 - existingImagesCount

    files = files.slice(0, remainingImagesAllowed)

    const [cardResponse, images] = await Promise.all([
      this.cardsService.update(card),
      Promise.all(
        files.map((file) => {
          const image = {
            url: `http://localhost:3001/images/${file.filename}`,
            name: file.originalname,
            cardId: card.id,
          }

          return this.imagesService.create(image)
        })
      ),
    ])
    return { ...cardResponse, images: [...existingImages, ...images] } as CardEntity
  }
}
