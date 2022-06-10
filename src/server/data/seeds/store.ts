import { Factory, Seeder } from 'typeorm-seeding';
import { Store } from '../models';

export default class CreateStores implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Store)().createMany(1000);
  }
}
