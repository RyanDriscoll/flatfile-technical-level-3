/* istanbul ignore file */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MulterModule } from '@nestjs/platform-express'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SectionsController } from './sections/sections.controller'
import { CardsController } from './cards/cards.controller'
import { CardEntity } from './entities/Card'
import { CardsService } from './cards/cards.service'
import { SectionEntity } from './entities/Section'
import { SectionsService } from './sections/sections.service'
import { ImageEntity } from './entities/Image'
import { ImagesService } from './images/images.service'
import { ImagesController } from './images/images.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'technical',
      password: 'technical',
      database: 'technical',
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([CardEntity, SectionEntity, ImageEntity]),
    MulterModule.register({
      dest: './src/files',
    }),
  ],
  controllers: [AppController, SectionsController, CardsController, ImagesController],
  providers: [AppService, CardsService, SectionsService, ImagesService],
})
export class AppModule {}
