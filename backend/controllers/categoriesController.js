const { prisma } = require("../constants/config.js");
const { DateTime } = require("luxon");

const categories_get = async(req, res) => {
    if(req.session.userId){
        let ctgs;
        try{
            ctgs = await prisma.transactionCategory
                .findMany()
                .catch(() => console.log("err"));

            if(ctgs){
                res.status(200).send(ctgs);
            }
        }
        catch{
            res.status(400).send("error");
        }
    }
    else{
        res.status(401).send("Efetue o login");
    }
};

const categories_transaction_sum = async (req, res) => {
    if(req.session.userId){
        let firstDate = req.query.firstDate;
        let lastDate = DateTime.now().toISO();

        if(!firstDate){
            firstDate = DateTime.now().minus({ month: 1}).toISO();
        }

        try{
            const transactions = await prisma.transaction
                .groupBy({
                    by: ["transactionCategoryId"],
                    _sum: {
                        money: true,
                    },
                    where: {
                        wallet: {
                            userId: req.session.userId,
                        },
                        date: {
                            gte: firstDate,
                            lt: lastDate,
                        },
                    },
                })
            res.send(transactions);
        }
        catch{
            res.status(400).send("Err");
        }
    }
};

module.exports = {categories_get, categories_transaction_sum};