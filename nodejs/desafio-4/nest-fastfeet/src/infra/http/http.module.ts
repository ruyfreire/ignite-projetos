import { Module } from '@nestjs/common'

import { CryptographyModule } from '../cryptography/cryptography.module'
// import { FetchDeliverymanController } from './controllers/fetch-deliveryman.controller'
// import { FetchDeliverymanUseCase } from '@/domain/delivery/application/use-cases/fetch-deliveryman'
import { CreateAdminController } from './controllers/create-admin.controller'
import { CreateAdminUseCase } from '@/domain/delivery/application/use-cases/create-admin'
import { RepositoriesModule } from '../repositories/repositories.module'

@Module({
  imports: [CryptographyModule, RepositoriesModule],
  controllers: [CreateAdminController],
  providers: [CreateAdminUseCase],
})
export class HttpModule {}
