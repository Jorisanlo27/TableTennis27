require('dotenv').config();


module.exports={
    server:{
        port:process.env.PORT
    },
    db:{
        uri:process.env.DATABASE_URI
    },
    mail:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    },

}