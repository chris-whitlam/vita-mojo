import { Type } from 'class-transformer';
import { Matches, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class StoreFilterOptionsDTO {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(7)
  @Type(() => Number)
  public weekday?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  public offset?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  public limit?: number;

  @IsOptional()
  @IsString()
  public searchQuery?: string;

  @IsOptional()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  public lat?: number;

  @IsOptional()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  public lng?: number;

  @IsOptional()
  @IsString()
  @Matches('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')
  public startHour?: string;

  @IsOptional()
  @IsString()
  @Matches('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')
  public endHour?: string;
}
