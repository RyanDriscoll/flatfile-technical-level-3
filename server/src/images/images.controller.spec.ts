import { Test, TestingModule } from '@nestjs/testing'
import { ImageEntity } from '../entities/Image'
import { Repository } from 'typeorm'
import { ImagesController } from './images.controller'
import { ImagesService } from './images.service'
import { getRepositoryToken } from '@nestjs/typeorm'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

export const repositoryMockFactory: () => MockType<Repository<jest.Mock>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}))

describe('ImagesController', () => {
  let controller: ImagesController
  let service: ImagesService
  let repositoryMock: MockType<Repository<ImageEntity>>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        ImagesService,
        {
          provide: getRepositoryToken(ImageEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile()

    controller = module.get<ImagesController>(ImagesController)
    service = module.get<ImagesService>(ImagesService)
    repositoryMock = module.get(getRepositoryToken(ImageEntity))
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
