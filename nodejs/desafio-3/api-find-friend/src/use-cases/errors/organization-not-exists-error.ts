export class OrganizationNotExistsError extends Error {
  constructor() {
    super('Organization not exists')
  }
}
