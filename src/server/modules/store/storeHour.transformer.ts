import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class StoreHourTransformer {
  @Expose()
  @Transform(({ value }) => value.replace(/:\d{2}$/, ''))
  from: string;

  @Expose()
  @Transform(({ value }) => value.replace(/:\d{2}$/, ''))
  to: string;

  @Expose()
  weekday: number;
}
