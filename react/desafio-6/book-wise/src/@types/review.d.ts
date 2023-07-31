export interface Review {
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
