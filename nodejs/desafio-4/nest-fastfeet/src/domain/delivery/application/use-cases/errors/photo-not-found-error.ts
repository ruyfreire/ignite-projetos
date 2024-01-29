export class PhotoNotFoundError extends Error {
  constructor() {
    super('Photo not found')
  }
}
