import { Sequelize } from "sequelize-typescript";
import { SequelizeStorage, Umzug } from "umzug";
import { join } from "path";

// Função para criar uma instância do Sequelize
export const createSequelizeInstance = (storage: string = '/app/src/infrastructure/database/database.sqlite') => {
    return new Sequelize({
        dialect: 'sqlite',
        storage,
        logging: false,
    });
};
export const migrator = (
    sequelize: Sequelize
  ) => {
    return new Umzug({
      migrations: {
        glob: [
          "src/infrastructure/database/migrations/*.{ts,js}",
          {
            cwd: join(__dirname, "../../../"),
            ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"],
          },
        ],
      },
      context: sequelize,
      storage: new SequelizeStorage({ sequelize }),
      logger: undefined
    })
}