var fs = require('fs');

getLegislatorData = function(){
  var legislatorData = fs.readFileSync('data/data.json', 'utf8');
  return JSON.parse(legislatorData);
}

saveLegislatorData = function(newData){
  fs.writeFile('data/data.json', JSON.stringify(newData));
}

addLegislator = function(leg) {
	var legislatorData = getLegislatorData();
  console.log(leg);
  var newLegislator={
    "id": leg.member_id,
    "first_name": leg.first_name,
    "last_name": leg.last_name,
    "party": leg.current_party,
    "twitter_id":leg.twitter_account
  }

  for(let i = 0; i < legislatorData.legislators.length; i++){
    if(legislatorData.legislators[i].id == newLegislator.id)
      return;
  }

  legislatorData.legislators.push(newLegislator);
  legislatorData.counter = legislatorData.legislators.length;
  saveLegislatorData(legislatorData);
}
deleteLegislator = function(legID){
  var legislatorData = getLegislatorData();
  var legToDelete;
  for(var i = 0; i < legislatorData.legislators.length; i++){
    if(legislatorData.legislators[i].id == legID) {
      legToDelete = i;
      break;
    }
  }
  legislatorData.legislators.splice(legToDelete, 1);
  legislatorData.counter=legislatorData.legislators.length;
  saveLegislatorData(legislatorData);
}
addBill = function(bill) {
	var legislatorData = getLegislatorData();
  console.log(bill);
  var newBill={
    "id": bill.bill_id,
    "title": bill.title
  }

  for(let i = 0; i < legislatorData.bills.length; i++){
    if(legislatorData.bills[i].id == newBill.id)
      return;
  }

  legislatorData.bills.push(newBill);
  saveLegislatorData(legislatorData);
}
deleteBill = function(billId){
  var legislatorData = getLegislatorData();
  var billToDelete;
  for(var i = 0; i < legislatorData.bills.length; i++){
    if(legislatorData.bills[i].id == billId) {
      billToDelete = i;
      break;
    }
  }
  legislatorData.bills.splice(billToDelete, 1);
  saveLegislatorData(legislatorData);
}

exports.addLegislator = addLegislator;
exports.deleteLegislator = deleteLegislator;
exports.getLegislatorData = getLegislatorData;
exports.saveLegislatorData = saveLegislatorData;
exports.addBill = addBill;
exports.deleteBill = deleteBill;
// exports.updateMovieData = updateMovieData;
// exports.deleteMovieData = deleteMovieData;
