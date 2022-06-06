const { PrismaClient } = require('@prisma/client');
const { users, games, apps } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
    try {
        // Delete all records from all tables
        await prisma.user.deleteMany();
        console.log("Deleted records in category table");
        await prisma.game.deleteMany();
        console.log("Deleted records in category table");
        await prisma.app.deleteMany();
        console.log("Deleted records in category table");

        //  Create seed records
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