const mongoose = require('mongoose');
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`DB connected`);

    } catch (error) {
        console.error("error " + error.message);
    }
}
connectDB()
const UserSchema = mongoose.Schema({
    username:{type:String},
    firstname:{type:String},
    lastname:{type:String},
    password:{type:String}
})

const AccountSchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true},
    balance:{type:Number, required: true}
})

const User = mongoose.model('User',UserSchema);
const Account = mongoose.model('Account', AccountSchema)
module.exports = {
    User,
    Account,
    connectDB,
}

