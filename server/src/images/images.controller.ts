import { Controller, Get, Logger, Param, Res } from '@nestjs/common'

@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name)

  constructor() {}

  @Get(':imgpath')
  getImage(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './src/files' })
  }
}
