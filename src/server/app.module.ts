import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './modules/store/store.module';
import { AppController } from './app.controller';
import { ViewModule } from './modules/view/view.module';

@Module({
  imports: [TypeOrmModule.forRoot(), StoreModule, ViewModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
