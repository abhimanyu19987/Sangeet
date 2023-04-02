

const jwt =require("jwt");

exports={}

exports.getToken =async() =>{
  const token =jwt.sign ({identifier:UserModel._id});
    return token;

};
module.exports=exports