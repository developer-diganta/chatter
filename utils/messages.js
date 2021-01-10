const moment=require("moment");
function formatMessage(username,text){

  return{
    username,
    text,
    time:moment().format('MMMM Do YYYY,h:mm a')
  }
}

module.exports = formatMessage;
