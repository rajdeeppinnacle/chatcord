const moment = require('moment');
const con = require("../db.js")

function formatMessage(empId,empName, text) {
  return {
    empId,
    empName,
    text,
    time: moment().format('h:mm a')
  };
}

function saveMessage(sender,receiver,message){
  con.query(`insert into 3_Happiest_chats(senderId,receiverId,message) values(?) `,[[sender,receiver,message]],(err,result)=>{

    if(err){
      console.log(err);
    }

  })
}

module.exports = {formatMessage,saveMessage};
