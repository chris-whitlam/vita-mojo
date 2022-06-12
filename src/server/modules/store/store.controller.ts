import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StoreFilterOptionsDTO } from './storeFilterOptions.dto';

import { StoreService } from './store.service';
import { StoreTransformer } from './store.transformer';

@Controller('api/stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getList(
    @Query() filterOptions: StoreFilterOptionsDTO,
  ): Promise<StoreTransformer[]> {
    const stores = await this.storeService.getList(filterOptions);
    return plainToInstance(StoreTransformer, stores);
  }

  /**
   * this endpoint should export all stores from database as a csv file
   * */
  @Get('export')
  async export() {
    // todo
  }
}
