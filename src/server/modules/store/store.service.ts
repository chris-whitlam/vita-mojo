import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Store } from 'server/data/models';
import { StoreRepository } from 'server/data/repositories';
import { StoreFilterOptionsDTO } from './storeFilterOptions.dto';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 15;

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreRepository)
    private readonly storeRepository: StoreRepository,
  ) {}

  getOne(storeUUID: string, relations = []) {
    return this.storeRepository.findOne({
      where: { uuid: storeUUID },
      relations,
    });
  }

  getList({
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
    searchQuery,
    lat,
    lng,
    startHour,
    endHour,
  }: StoreFilterOptionsDTO): Promise<Store[]> {
    // TODO: Get hours working, sort by distance if lat and long provided otherwiser use sortOrder field from stores table
    // assert lat and long both provided

    return this.storeRepository.find({
      take: limit,
      skip: offset,
      where: {
        ...(searchQuery && { name: searchQuery }),
        ...(lat && { lat }),
        ...(lng && { long: lng }),
      },
    });
  }
}
