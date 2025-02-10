import { createSequelizeInstance, Migrator } from "./infrastructure/database/migrator";

async function main() {
    try {
        const sequelize = createSequelizeInstance();
        const migrator = new Migrator(sequelize);
        await migrator.down();
        await sequelize.close();
    } catch (error) {
        console.error(error);
    }
}

main();