const { prisma } = require("../constants/config.js");

//ADD CATEGORIES AS SEED DATA
const seed = async () => {
    try{
        let ctgs = await prisma.transactionCategory.findMany();
        if(!ctgs.length){
            //CREATE THE FOUR CATEGORIES
            await prisma.transactionCategory
                .createMany({
                    data: [
                        { name: "Produtos" },
                        { name: "Lazer" },
                        { name: "Contas"},
                        { name: "Outros" },
                    ],
                    skipDuplicates: true,
                })
                .catch(() => {
                    console.log("error sending {prisma Client}");
                })
        }
    }
    catch{
        console.log("error seeding");
    }
};

seed();