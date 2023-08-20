import { ReviewDetails } from "./review"

export interface Book {
  id: string
  title: string
  author: string
  imageUrl: string
  category: string[]
  rating: number
}

export interface BookDetails {
  id: string
  title: string
  author: string
  imageUrl: string
  rating: number
  ratingCount: number
  categories: string[]
  pages: number
  reviews: ReviewDetails[]
}
