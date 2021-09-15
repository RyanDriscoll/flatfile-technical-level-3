import { editFileName, imageFileFilter } from './image-upload.utils'

describe('Image upload utils', () => {
  describe('imageFileFilter', () => {
    let file
    let mockCallback

    beforeEach(() => {
      file = {
        originalname: 'test.png',
      }
      mockCallback = jest.fn()
    })

    it('calls the callback successfully', () => {
      imageFileFilter(null, file, mockCallback)

      expect(mockCallback).toHaveBeenCalledTimes(1)
      expect(mockCallback).toHaveBeenCalledWith(null, true)
    })
    it('calls the callback unsuccessfully if the file is not an image', () => {
      file.originalname = 'bad-file.pdf'
      imageFileFilter(null, file, mockCallback)

      expect(mockCallback).toHaveBeenCalledTimes(1)
      expect(mockCallback).toHaveBeenCalledWith(new Error('Only image files are allowed!'), false)
    })
  })

  describe('editFileName', () => {
    let file
    let mockCallback

    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.1)
      file = {
        originalname: 'test.png',
      }
      mockCallback = jest.fn()
    })

    it('calls the callback successfully', () => {
      editFileName(null, file, mockCallback)

      expect(mockCallback).toHaveBeenCalledTimes(1)
      expect(mockCallback).toHaveBeenCalledWith(null, 'test-2222.png')
    })
  })
})
