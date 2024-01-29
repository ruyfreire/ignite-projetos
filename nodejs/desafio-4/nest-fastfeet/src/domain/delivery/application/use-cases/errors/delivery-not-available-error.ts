export class DeliveryNotAvailableError extends Error {
  constructor() {
    super('Delivery not available')
  }
}
