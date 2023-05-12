const path = require('path')

module.exports = {
    type: 'postgres',
    entities: [path.join('dist', 'entities', '*{.ts,.js}')],
    autoLoadEntities: false,
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    migrations: [path.join('dist', 'migrations', '*{.ts,.js}')],
    cli: {
        migrationsDir: path.join('src', 'migrations'),
    },
};