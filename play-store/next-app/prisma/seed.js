const { PrismaClient } = require('@prisma/client');
const { users, roles, games, apps } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.user.deleteMany();
        console.log("Deleted records in category table");

        await prisma.role.deleteMany();
        console.log("Deleted records in product table");

        await prisma.game.deleteMany();
        console.log("Deleted records in category table");

        await prisma.app.deleteMany();
        console.log("Deleted records in category table");

        // await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
        // console.log("reset User auto increment to 1");

        // await prisma.$queryRaw`ALTER TABLE Role AUTO_INCREMENT = 1`;
        // console.log("reset Role auto increment to 1");

        // await prisma.$queryRaw`ALTER TABLE Game AUTO_INCREMENT = 1`;
        // console.log("reset Game auto increment to 1");

        // await prisma.$queryRaw`ALTER TABLE App AUTO_INCREMENT = 1`;
        // console.log("reset App auto increment to 1");

        await prisma.role.createMany({
            data: roles
        });
        console.log("Added roles data");

        await prisma.user.createMany({
            data: users
        })
        console.log("Added users data");

        await prisma.game.createMany({
            data: games
        });
        console.log("Added games data");

        await prisma.app.createMany({
            data: apps
        })
        console.log("Added apps data");
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    };
}

load();