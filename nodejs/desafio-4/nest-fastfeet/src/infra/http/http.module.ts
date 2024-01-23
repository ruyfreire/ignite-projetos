import { Module } from '@nestjs/common'

import { CryptographyModule } from '../cryptography/cryptography.module'
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
import { CreateOrderController } from './controllers/create-order.controller'
import { CreateOrderUseCase } from '@/domain/delivery/application/use-cases/create-order'
import { FetchOrderController } from './controllers/fetch-order.controller'
import { UpdateOrderController } from './controllers/update-order.controller'
import { DeleteOrderController } from './controllers/delete-order.controller'
import { FetchOrderUseCase } from '@/domain/delivery/application/use-cases/fetch-order'
import { UpdateOrderUseCase } from '@/domain/delivery/application/use-cases/update-order'
import { DeleteOrderUseCase } from '@/domain/delivery/application/use-cases/delete-order'
import { CreateDeliveryController } from './controllers/create-delivery.controller'
import { CreateDeliveryUseCase } from '@/domain/delivery/application/use-cases/create-delivery'
import { FetchDeliveryController } from './controllers/fetch-delivery.controller'
import { FetchDeliveryUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery'
import { FetchDeliveryByReceiverCpfController } from './controllers/fetch-delivery-by-receiver-cpf.controller'
import { FetchDeliveryByReceiverCpfUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery-by-receiver-cpf'
import { FetchDeliveryByDeliverymanCpfController } from './controllers/fetch-delivery-by-deliveryman-cpf.controller'
import { FetchDeliveryByDeliverymanCpfUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery-by-deliveryman-cpf'
import { UpdateDeliveryController } from './controllers/update-delivery.controller'
import { UpdateDeliveryUseCase } from '@/domain/delivery/application/use-cases/update-delivery'
import { DeleteDeliveryController } from './controllers/delete-delivery.controller'
import { DeleteDeliveryUseCase } from '@/domain/delivery/application/use-cases/delete-delivery'

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
    CreateOrderController,
    FetchOrderController,
    UpdateOrderController,
    DeleteOrderController,
    CreateDeliveryController,
    FetchDeliveryController,
    FetchDeliveryByReceiverCpfController,
    FetchDeliveryByDeliverymanCpfController,
    UpdateDeliveryController,
    DeleteDeliveryController,
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
    CreateOrderUseCase,
    FetchOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
    CreateDeliveryUseCase,
    FetchDeliveryUseCase,
    FetchDeliveryByReceiverCpfUseCase,
    FetchDeliveryByDeliverymanCpfUseCase,
    UpdateDeliveryUseCase,
    DeleteDeliveryUseCase,
  ],
})
export class HttpModule {}
