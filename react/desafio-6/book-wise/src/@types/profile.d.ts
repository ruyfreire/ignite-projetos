export interface Profile {
  user: {
    id: string
    name: string
    avatarUrl: string
    createdAt: string
  }
  infos: {
    pagesRead: number
    booksRated: number
    authorsRead: number
    categoryMostRead: string
  }
}
