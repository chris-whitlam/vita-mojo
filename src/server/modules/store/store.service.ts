import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Store, StoreHours } from 'server/data/models';
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
    searchQuery = '',
    weekday,
    lat,
    lng,
    startHour,
    endHour,
  }: StoreFilterOptionsDTO): Promise<Store[]> {
    // TODO: Get hours working, sort by distance if lat and long provided otherwiser use sortOrder field from stores table
    // assert lat and long both provided

    const hasCoordinates = lat != undefined && lng != undefined;
    const shouldFilterByHours =
      weekday != undefined && startHour != undefined && endHour != undefined;

    const query = this.storeRepository
      .createQueryBuilder('store')
      .where('store.name like :name', { name: `%${searchQuery}%` })
      .andWhere('status = 1')
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

    if (shouldFilterByHours) {
      query
        .leftJoin(StoreHours, 'sh', 'store.id = sh.store_id')
        .andWhere('sh.weekday = :weekday', { weekday })
        .andWhere('sh.from >= :startHour AND sh.to <= :endHour', {
          startHour,
          endHour,
        });
    }

    return query.getMany();
  }
}
