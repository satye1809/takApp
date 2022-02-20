const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');


require('../db/conn');
const User =require("../model/userSchema");
const Feeds = require('../model/feedsSchema');
router.get('/',(req,res)=>{
    res.send('hello world from the server router js');
});

router.post('/register', async (req,res)=>{

    const { userName, emailId, password, phoneNo, gender, language, maritalStatus, dateOfbirth, timeOfbirth} =req.body;
    
    if(!userName || !emailId || !password || !phoneNo || !gender || !language || !maritalStatus || !dateOfbirth || !timeOfbirth){
        return res.status(422).json({error:'Field is mandatory'});
    }
    try{
        const userExist = await User.findOne({emailId:emailId});
        
        if(userExist){
            const userLogin = await User.findOne({emailId: emailId});
            const token = await userLogin.generateAuthToken();
            console.log(token)
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+ 25892000000),
                httpOnly:true
             })
     
            return res.status(422).json({error:'Email already exists'});
        }
        
        const user = new User({userName, emailId, password, phoneNo, gender, language, maritalStatus, dateOfbirth, timeOfbirth})

        await user.save();
        const userLogin = await User.findOne({emailId: emailId});
        const token = await userLogin.generateAuthToken();
        console.log(token)

        res.cookie("jwtoken",token,{
           expires:new Date(Date.now()+ 25892000000),
           httpOnly:true
        })

         res.status(201).json({message:"User Profile updated successfuly"});

        

            } catch(err){
                console.log(err);
            }
            
});

router.post('/upload', async (req,res)=>{

    const { headline,category,authorName,media} =req.body;
    
    if(!headline || !category || !authorName){
        return res.status(422).json({error:'Field is mandatory'});
    }
    try{
        const uploadTime =new Date();
        console.log('media',media)
        const feeds = new Feeds({headline, category, authorName, uploadTime, media})
        
        await feeds.save();

        res.status(201).json({message:"feeds updated successfuly"});

        } catch(err){
            console.log(err);
        }
            
});

router.get('/feeds', async (req,res)=>{
    try{
        let feedSearch
    const { category=[],authorName=[],textSearch='' } =req.body;
        
    //if category filters and search is enabled
    if(category.length>0 && authorName.length==0 && textSearch.length>0){
        let genre = category
         feedSearch = await Feeds.find({ category: { $in: genre},$text: {$search:textSearch}})
    }
    //if author filter and search is enabled
    else if(category.length== 0 && authorName.length>0&& textSearch.length>0){
        let authNam = authorName
         feedSearch = await Feeds.find({ authorName: { $in: authNam },$text: {$search:textSearch}})
    }
    //if both filter and search is enabled
    else if(category.length>0 && authorName.length>0 && textSearch.length>0){
        let authNam = authorName
        let genre = category
         feedSearch = await Feeds.find({ authorName: { $in: authNam },category:{$in: genre},$text: {$search:textSearch}})
        
    }
    //if only search is enabled
    else if(category.length==0 && authorName.length==0 && textSearch.length>0){
         feedSearch = await Feeds.find({$text: {$search:textSearch}})
    }
    //if only author filter is enabled and search is disabled
    else if(category.length== 0 && authorName.length>0&& textSearch.length==0){
        let authNam = authorName
         feedSearch = await Feeds.find({ authorName: { $in: authNam }})
    }
    //if both filter are enabled and search is disabled
    else if(category.length>0 && authorName.length>0 && textSearch.length==0){
        let authName = authorName
        let genre = category
         feedSearch = await Feeds.find({ authorName: { $in: authName },category:{$in: genre}})
    }
    //if only category  is enabled and search is disabled
    else if(category.length> 0 && authorName.length==0&& textSearch.length==0){
        let genre = category
         feedSearch = await Feeds.find({ category: { $in: genre }})
    }
    else if(category.length== 0 && authorName.length==0&& textSearch.length==0){
         feedSearch = await Feeds.find({})
    }
    //if all are disabled
    else {
         feedSearch = await Feeds.find()
    }

    

    res.status(201).json({message:feedSearch});

} catch(err){
    console.log(err);
    res.status(422).json({message:"not updated"});
}
            
});



module.exports = router;