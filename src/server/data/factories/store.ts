import { define } from 'typeorm-seeding';
import * as faker from 'faker';
import { Store, StoreHours } from '../models';

define(Store, () => {
  const store = new Store();
  store.uuid = faker.datatype.uuid();
  store.name = faker.company.companyName();
  store.email = faker.internet.email();
  store.status = faker.datatype.number({
    min: 0,
    max: 1,
  });
  store.address = faker.address.streetAddress();
  store.url = faker.internet.url();
  store.lat = faker.address.latitude();
  store.long = faker.address.longitude();
  store.sortOrder = faker.datatype.number();
  store.hours = [];
  for (let weekday = 1; weekday <= 7; weekday++) {
    const storeHours = new StoreHours();
    storeHours.weekday = weekday;
    storeHours.from = `${faker.datatype.number({
      min: 0,
      max: 12,
    })}:${faker.datatype.number({ min: 0, max: 59 })}`;
    storeHours.to = `${faker.datatype.number({
      min: 13,
      max: 23,
    })}:${faker.datatype.number({ min: 0, max: 59 })}`;
    storeHours.type = faker.datatype.number({ min: 0, max: 1 });
  }
  return store;
});
