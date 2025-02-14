import { createSequelizeInstance, migrator } from "./infrastructure/database/migrator";

async function main() {
    try {
        const sequelize = createSequelizeInstance();
        const migration = migrator(sequelize);
        await migration.up();
        await sequelize.close();
    } catch (error) {
        console.error(error);
    }
}

main();