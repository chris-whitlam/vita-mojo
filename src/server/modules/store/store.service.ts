import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Store } from 'server/data/models';
import { StoreRepository } from 'server/data/repositories';
import { Like } from 'typeorm';
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
    searchQuery = '',
    lat,
    lng,
    startHour,
    endHour,
  }: StoreFilterOptionsDTO): Promise<Store[]> {
    // TODO: Get hours working, sort by distance if lat and long provided otherwiser use sortOrder field from stores table
    // assert lat and long both provided

    const hasCoordinates = lat != undefined && lng != undefined;

    const query = this.storeRepository
      .createQueryBuilder('store')
      .where('store.name like :name', { name: `%${searchQuery}%` })
      .offset(offset)
      .limit(limit);

    if (hasCoordinates) {
      query.addSelect(
        `ST_Distance_Sphere(
            point(${lng}, ${lat}),
            point(store.long, store.lat)
          )`,
        'distance',
      );
      query.orderBy({ distance: 'ASC' });
    } else {
      query.orderBy({ sort_order: 'ASC' });
    }

    return query.getMany();
  }
}
