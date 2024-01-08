export class DeliveryAlreadyExistsError extends Error {
  constructor() {
    super('Delivery already exists')
  }
}
