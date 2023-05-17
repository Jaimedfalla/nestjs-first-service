import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.setGlobalPrefix('api'); //Asigna el prefijo definido a todas las rutas del servicio. Para este ejemplo 'api'
  app.enableCors(CORS);

  //Se implementa el pipe para validar los dtos antes de llegar al controller
  app.useGlobalPipes(new ValidationPipe({
    transformOptions:{
      enableImplicitConversion: true
    },
    whitelist:true
  }));

  //Se hace esta configuración para excluir las propiedades que tienen el decorador Exclude
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);
  console.log(`app is running on ${await app.getUrl()}`);
}
bootstrap();
