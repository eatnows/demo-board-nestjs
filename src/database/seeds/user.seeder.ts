import { User } from "../../entity/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    await repository.insert([
      {
        username: 'nestjs',
        name: 'hong gildong',
        password: 'nestjs1234',
      },
    ]);
  }
}
