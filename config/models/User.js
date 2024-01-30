
const Userschema = new mongoose.Schema({
    Username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    PassWord:{
        type:String,
        unique:true
    }
})
const User= mongoose.model('User',Userschema)

module.exports=User