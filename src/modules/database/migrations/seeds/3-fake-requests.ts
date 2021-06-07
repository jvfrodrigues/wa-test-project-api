import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IRequest } from 'modules/database/interfaces/request';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  for (let x = 0; x < 100; x++) {
    const description = faker.random.words(5);
    const quantity = faker.random.number();

    const request: IRequest = {
      description,
      quantity,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(request).into('Request');
  }
}
