export interface ReviewDetails {
  id: string
  createdAt: string
  rating: number
  description: string
  user: {
    id: string
    name: string
    avatarUrl: string
  }
}

export interface ReviewRecent {
  id: string
  created_at: string
  rating: number
  description: string
  user: {
    id: string
    name: string
    avatarUrl: string
  }
  book: {
    title: string
    author: string
    imageUrl: string
  }
}

export interface ReviewPopular {
  id: string
  rating: number
  book: {
    title: string
    author: string
    imageUrl: string
  }
}
