import { Exclude, Expose, Transform, Type } from 'class-transformer';
import * as R from 'ramda';

import { Store } from 'server/data/models';
import { StoreHourTransformer } from './storeHour.transformer';

@Exclude()
export class StoreTransformer {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  email: string;

  @Expose()
  lat: number;

  @Expose()
  long: number;

  @Expose()
  sortOrder: number;

  @Expose()
  @Transform(R.ifElse(R.isEmpty, R.always(null), R.head))
  @Type(() => StoreHourTransformer)
  storeHours: StoreHourTransformer;

  constructor(partial: Partial<Store>) {
    Object.assign(this, partial);
  }
}
