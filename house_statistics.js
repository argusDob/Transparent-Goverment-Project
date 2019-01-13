var members = data.results[0].members; //grab data
removeUndefined();

var statistics =

	{

		"numbOfDem": calcLengthAndStore("D"),
		"numbOfRep": calcLengthAndStore("R"),
		"numbOfInd": calcLengthAndStore("I"),
		"DemPerc": calculateAverageVotes("D"),
		"Indperc": calculateAverageVotes("I"),
		"Repperc": calculateAverageVotes("R"),
		"test1234": getTenPerOfMissed(members),
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
//method to replace undefinied with zero
function removeUndefined() {
	for (var i = 0; i < members.length; i++) {
		if (members[i].votes_with_party_pct === undefined) {
			members[i].votes_with_party_pct = 0;
		}
	}
}



//get the sum of the votes per party
function calculateAverageVotes(party) {

	var sum = 0;
	for (var i = 0; i < members.length; i++) {
		if (members[i].party === party) {
			sum += members[i].votes_with_party_pct;
		}
	}
	return sum;
}

function sortArrayToTop() {
	tempArray = [];
	members.sort(function (a, b) {
		return a.missed_votes_pct - b.missed_votes_pct
	});
	tempArray.push(members);
	for (var i = 0; i < tempArray.length; i++) {

	}

	getTenPerOfMissed(members);

}

sortArrayToTop();


function getTenPerOfMissed(array) {

	var tempArray = [];
	var len = array.length * 0.1;
	for (var i = 0; i < array.length; i++) {
		//	console.log(array[i].missed_votes_pct);
		if (i < len) {
			tempArray.push(array[i]);
		} else if (array[i].missed_votes_pct == array[i + 1].missed_votes_pct) { //find the 10% of the lowest values and keep also values that                                                                               repeated
			tempArray.push(array[i]);
		} else {
			break;
		}
	}

	console.log(tempArray);

}


function sortArrayToBottom() {

	tempArray = [];
	members.sort(function (a, b) {
		return b.missed_votes_pct - a.missed_votes_pct
	});
	tempArray.push(members);
	for (var i = 0; i < tempArray.length; i++) {
		//    console.log(tempArray);
	}
	getTenPerOfMissed(members);

}

sortArrayToBottom();
console.log("Our statistics are :", statistics);
