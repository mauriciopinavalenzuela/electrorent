import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Electrorent API')
    .setDescription('API para gestión de arriendos y dispositivos')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      cache: false, 
    },
  });

  await app.listen(3030);
}
bootstrap();

