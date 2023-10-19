import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface GymUseCaseRequest {
  title: string
  description: string
  phone: string
  latitude: number
  longitude: number
}

interface GymUseCaseResponse {
  gym: Gym
}

export class GymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymUseCaseRequest): Promise<GymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
