import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CardEntity } from '../entities/Card'
import { CardsController } from './cards.controller'
import { CardsService } from './cards.service'
import { ImageEntity } from '../entities/Image'
import { ImagesService } from '../images/images.service'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

export const repositoryMockFactory: () => MockType<Repository<jest.Mock>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  findAndCount: jest.fn((entity) => [entity, 0]),
}))

describe('CardsController', () => {
  let controller: CardsController
  let service: CardsService
  let repositoryMock: MockType<Repository<CardEntity>>
  let imageRepositoryMock: MockType<Repository<ImageEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        CardsService,
        {
          provide: getRepositoryToken(CardEntity),
          useFactory: repositoryMockFactory,
        },
        ImagesService,
        {
          provide: getRepositoryToken(ImageEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    controller = module.get<CardsController>(CardsController)
    service = module.get<CardsService>(CardsService)
    repositoryMock = module.get(getRepositoryToken(CardEntity))
    imageRepositoryMock = module.get(getRepositoryToken(ImageEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call save on cards repository', async () => {
    const card = new CardEntity()
    card.title = 'test'
    card.section_id = 1
    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(card))
    expect(await controller.addCard({ sectionId: 1, title: 'test' })).toBe(card)
  })

  it('should call update on cards repository', async () => {
    const card = new CardEntity()
    card.title = 'test'
    card.section_id = 1
    card.id = 1
    card.description = ''
    const files = [{ filename: 'coolImage-1234.png', originalname: 'coolImage.png' }]
    jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(card))
    expect(
      await controller.updateCard({ id: 1, sectionId: 1, title: 'test', description: '' }, files)
    ).toBe(card)
  })
})
