export class DeliveryNotFoundError extends Error {
  constructor() {
    super('Delivery not found')
  }
}
