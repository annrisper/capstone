import app from "./app";
import "colors"
import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();
const port = 3000;

const main = async () =>{
    try{
        await prisma.$connect();
        console.log('Database connected successfully'.green);

        app.listen(port, () =>{
            console.log(`Server running on http://localhost:${port}`.green);
        })
    }catch(error){
        console.error('Error connecting to database'.red, error);
        await prisma.$disconnect();
    };
};

main();