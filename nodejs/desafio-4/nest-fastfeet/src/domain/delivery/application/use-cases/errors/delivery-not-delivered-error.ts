export class DeliveryNotDeliveredError extends Error {
  constructor() {
    super('Delivery not delivered')
  }
}
