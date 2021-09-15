import { extname } from 'path'

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false)
  }
  callback(null, true)
}

export const editFileName = (req, file, callback) => {
  const [name] = file.originalname.split('.')
  const fileExtName = extname(file.originalname)
  let randomString = ''
  for (let i = 0; i < 4; i++) {
    randomString += Math.round(Math.random() * 16).toString(16)
  }

  callback(null, `${name}-${randomString}${fileExtName}`)
}
