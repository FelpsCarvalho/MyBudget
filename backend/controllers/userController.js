const { prisma } = require("../constants/config");
const bcrypt = require("bcrypt");

const user_update_meta = async(req, res) => {
    const {firstName, lastName } = req.body;
    //IF USER IS LOGGED IN
    if(req.session.userId){
        try{
            await prisma.user.update({
                where:{
                    id: req.session.userId,
                },
                data:{
                    firstName: firstName,
                    lastName: lastName,
                },
            });
            res.status(200).send("Updated");
        }
        catch(e){
            console.log(e);
            res.status(500).send("Error {Update Meta}");
        }
    }
    else{
        //IF NOT
        res.status(401).send("Efetue o login");
    }
};

//UPDATE PW
const user_update_password = async (req, res) => {
    const { password, oldPassword } = req.body;
    let user;
    if(req.session.userId){
        //FIND USER
        try{
            user = await prisma.user.findUnique({
                where: {
                    id: req.session.userId,
                },
            });
        }
        catch{
            res.status(401).send("err");
            return;
        }
    }
    else{
        res.status(401).send("Efetue o login")
    }

    //IF USER IS FOUND
    if(user){
        const isPassCorrect = await bcrypt.compare(oldPassword, user.password);
        if(isPassCorrect){
            //hash and set new pw
            const saltRounds = 10;
            let newPassword = await bcrypt.hash(password, saltRounds);
            try{
                await prisma.user.update({
                    where: {
                        id: req.session.userId,
                    },
                    data:{
                        password: newPassword,
                    },
                });
                //DELETE ALL SESSIONS   
                try{
                    //req.session.destroy();
                    await prisma.session.deleteMany({
                        where: {
                            data: {
                                endsWith: `, "userId":${req.session.userId}}`,
                            },
                        },
                    });
                    res.clearCookie("sess").status(200).send("Updated");
                }
                catch{
                    res.status(500).send("err deleting sessions");
                }
            }
            catch{
                res.status(500).send("Cannot update pw")
            }
        }
        else{
            //IF PW IS NOT CORRECT
            res.status(403).send("Senha Incorreta");
        }
    }
    else{
        res.status(401).send("Efetue o login")
    }
}

module.exports = {user_update_meta, user_update_password}