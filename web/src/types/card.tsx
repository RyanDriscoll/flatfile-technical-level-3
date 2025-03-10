import ImageI from './image'

export default interface CardI {
  id: number
  title: string
  description?: string
  section_id: number
  images: ImageI[]
}
