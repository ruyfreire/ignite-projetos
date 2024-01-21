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
import { FetchDeliverymanController } from './controllers/fetch-deliveryman.controller'
import { FetchDeliverymanUseCase } from '@/domain/delivery/application/use-cases/fetch-deliveryman'
import { UpdateDeliverymanController } from './controllers/update-deliveryman.controller'
import { UpdateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/update-deliveryman'
import { DeleteDeliverymanController } from './controllers/delete-deliveryman.controller'
import { DeleteDeliverymanUseCase } from '@/domain/delivery/application/use-cases/delete-deliveryman'
import { CreateReceiverController } from './controllers/create-receiver.controller'
import { CreateReceiverUseCase } from '@/domain/delivery/application/use-cases/create-receiver'
import { FetchReceiverController } from './controllers/fetch-receiver.controller'
import { FetchReceiverUseCase } from '@/domain/delivery/application/use-cases/fetch-receiver'
import { UpdateReceiverController } from './controllers/update-receiver.controller'
import { UpdateReceiverUseCase } from '@/domain/delivery/application/use-cases/update-receiver'
import { DeleteReceiverController } from './controllers/delete-receiver.controller'
import { DeleteReceiverUseCase } from '@/domain/delivery/application/use-cases/delete-receiver'

@Module({
  imports: [CryptographyModule, RepositoriesModule],
  controllers: [
    CreateAdminController,
    CreateDeliverymanController,
    AuthenticateAdminController,
    AuthenticateDeliverymanController,
    FetchDeliverymanController,
    UpdateDeliverymanController,
    DeleteDeliverymanController,
    CreateReceiverController,
    FetchReceiverController,
    UpdateReceiverController,
    DeleteReceiverController,
  ],
  providers: [
    CreateAdminUseCase,
    CreateDeliverymanUseCase,
    AuthenticateAdminUseCase,
    AuthenticateDeliverymanUseCase,
    FetchDeliverymanUseCase,
    UpdateDeliverymanUseCase,
    DeleteDeliverymanUseCase,
    CreateReceiverUseCase,
    FetchReceiverUseCase,
    UpdateReceiverUseCase,
    DeleteReceiverUseCase,
  ],
})
export class HttpModule {}
