import { Module } from '@nestjs/common'

import { CryptographyModule } from '../cryptography/cryptography.module'
// import { FetchDeliverymanController } from './controllers/fetch-deliveryman.controller'
// import { FetchDeliverymanUseCase } from '@/domain/delivery/application/use-cases/fetch-deliveryman'
import { CreateAdminController } from './controllers/create-admin.controller'
import { CreateAdminUseCase } from '@/domain/delivery/application/use-cases/create-admin'
import { RepositoriesModule } from '../repositories/repositories.module'
import { CreateDeliverymanController } from './controllers/create-deliveryman.controller'
import { CreateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/create-deliveryman'
import { AuthenticateAdminController } from './controllers/authenticate-admin.controller'
import { AuthenticateAdminUseCase } from '@/domain/delivery/application/use-cases/authenticate-admin'
import { AuthenticateDeliverymanController } from './controllers/authenticate-deliveryman.controller'
import { AuthenticateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/authenticate-deliveryman'

@Module({
  imports: [CryptographyModule, RepositoriesModule],
  controllers: [
    CreateAdminController,
    CreateDeliverymanController,
    AuthenticateAdminController,
    AuthenticateDeliverymanController,
  ],
  providers: [
    CreateAdminUseCase,
    CreateDeliverymanUseCase,
    AuthenticateAdminUseCase,
    AuthenticateDeliverymanUseCase,
  ],
})
export class HttpModule {}
