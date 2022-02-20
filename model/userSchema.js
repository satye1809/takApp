const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    userName :{
        type:String,
        required:true
    },
    emailId :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    maritalStatus:{
        type:String,
        required:true
    },
    dateOfbirth:{
        type:String,
        required:true
    },
    timeOfbirth:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            },
            }
        ]
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}


const User = mongoose.model('User',userSchema);

module.exports = User;