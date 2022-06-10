import { EntityRepository, Repository } from 'typeorm';

import { Store } from 'server/data/models';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {}
