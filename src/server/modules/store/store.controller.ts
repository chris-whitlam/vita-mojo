import { stringify } from 'csv-stringify';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Res,
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

  @Get('export')
  async export(@Res() res) {
    console.log('Exporting stores');
    let dataPointCounter = 1;
    const stringifier = stringify({ header: true });

    const stream = await this.storeService.streamAll();

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="stores.csv"`,
    });

    stringifier.on('data', () => {
      if (dataPointCounter % 100000 == 0) {
        console.log(`Processed ${dataPointCounter} data points`);
      }

      dataPointCounter += 1;
    });

    stringifier.on('error', (error) => {
      console.error(`Failed to complete export: ${error}`);

      res.status(500).end();
    });

    stringifier.on('finish', () => {
      console.log(`Export complete`);
      res.status(200).end();
    });

    stream.pipe(stringifier);
    stringifier.pipe(res);
  }
}
