export class NoOrganizationFoundInCityError extends Error {
  constructor() {
    super('No organizations found in the city')
  }
}
