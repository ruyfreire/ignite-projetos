export class PetsNotFoundInCityError extends Error {
  constructor() {
    super('Pets not found in city')
  }
}
