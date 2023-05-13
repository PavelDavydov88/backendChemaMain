import {DynamicModule, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {ClientProxyFactory, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './.env',
        }),
    ],
    providers: [SharedService],
    exports: [SharedService]
})
export class SharedModule {
    static registerRmq(service: string, queue: string): DynamicModule {
        const providers = [
            {
                provide: service,
                useFactory: () => {
                    const USER = process.env.RABBITMQ_USER
                    const PASSWORD = process.env.RABBITMQ_PASS
                    const HOST = process.env.RABBITMQ_HOST

                    return   ClientProxyFactory.create({
                        transport: Transport.RMQ,
                        options:{
                            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],

                            noAck: false,
                            queue,
                            queueOptions:{
                                durable: true,
                            },
                        },
                    })

                },
            }
        ];
        return {
            module: SharedModule,
            providers,
            exports: providers
        }
    }
}
