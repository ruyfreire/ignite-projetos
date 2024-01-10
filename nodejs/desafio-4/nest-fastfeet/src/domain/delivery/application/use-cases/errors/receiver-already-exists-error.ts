export class ReceiverAlreadyExistsError extends Error {
  constructor() {
    super('Receiver already exists')
  }
}
