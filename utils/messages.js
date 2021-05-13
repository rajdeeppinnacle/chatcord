const moment = require('moment');

function formatMessage(empId,empName, text) {
  return {
    empId,
    empName,
    text,
    time: moment().format('h:mm a')
  };
}
module.exports = {formatMessage};
