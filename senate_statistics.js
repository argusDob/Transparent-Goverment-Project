var members = data.results[0].members; //grab data
console.log(members)
var tempArray = [];






var statistics =

	{

		"numbOfDem": calcLengthAndStore("D"),
		"numbOfRep": calcLengthAndStore("R"),
		"numbOfInd": calcLengthAndStore("I"),
		"DemPerc": calculateAverageVotes("D") / calcLengthAndStore("D"), //object ,We create and we call the function inside  my obj
		"Indperc": calculateAverageVotes("I") / calcLengthAndStore("D"),
		"Repperc": calculateAverageVotes("I") / calcLengthAndStore("D"),
		"Test123": bottomTenPercent(),

	};





function calcLengthAndStore(party) {


	var array = [];
	for (var i = 0; i < members.length; i++) {

		if (members[i].party === party) {
			array.push(members[i].party);
		}
	
	}
	return array.length;

}


console.log("Ho")

console.log("Our statistics are :", statistics);
//calcLengthAndStore();
console.log(tempArray[1].first_name)


function calculateAverageVotes(party) {
	var sum = 0;
	for (var i = 0; i < members.length; i++) {
		if (members[i].party === party) {
			sum += members[i].votes_with_party_pct;
		}
	
	}
   
	return sum;


}

function bottomTenPercent() {
	members.sort(function (a, b) {
		return a.missed_votes_pct - b.missed_votes_pct;   //sort our array from lower to higher and call getTenPerOfMissed(members)
		                                                   //to keep the 10% of the lowest values
	});
    
	getTenPerOfMissed(members)
}

bottomTenPercent();


function getTenPerOfMissed(array) {

	var len = array.length * 0.1;
	for (var i = 0; i < array.length; i++) {

		if (i < len ) {
			tempArray.push(array[i]);
		} else if (array[i].missed_votes_pct == array[i+1].missed_votes_pct){      //find the 10% of the lowest values and keep also values that                                                                               repeated
			tempArray.push(array[i]);
		} else {
			break;
		}


	}

return tempArray;
}



console.log("Our statistics are :", statistics);


function TopTenPercent() {
	members.sort(function (a, b) {
		return b.missed_votes_pct - a.missed_votes_pct;       //sort ou array from lower to higher and call getTenPerOfMissed(members)
		});                                                      //to keep the 10% of the lowest v
	
    
  getTenPerOfMissed(members);

	
}

TopTenPercent();



console.log(tempArray[1].first_name)



