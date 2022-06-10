import { IsNumber, IsOptional, IsString } from 'class-validator';

export class StoreFilterOptionsDTO {
  @IsNumber()
  public weekday: number;

  @IsOptional()
  @IsNumber()
  public offset?: number;

  @IsOptional()
  @IsNumber()
  public limit?: number;

  @IsOptional()
  @IsString()
  public searchQuery?: string;

  @IsOptional()
  @IsNumber()
  public lat?: number;

  @IsOptional()
  @IsNumber()
  public lng?: number;

  @IsOptional()
  @IsString()
  public startHour?: string;

  @IsOptional()
  @IsString()
  public endHour?: string;
}
