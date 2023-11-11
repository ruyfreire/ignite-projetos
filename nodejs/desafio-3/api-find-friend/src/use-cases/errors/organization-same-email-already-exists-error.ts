export class OrganizationSameEmailAlreadyExistsError extends Error {
  constructor() {
    super('Organization with the same email already exists')
  }
}
