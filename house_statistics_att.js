const stat = Object.keys(statistics).map(i => statistics[i]);
//fetch the data
function getData() {
	var fetchConfig =
		fetch("https://api.propublica.org/congress/v1/115/senate/members.json", {
			method: "GET",
			headers: new Headers({
				"X-API-Key": 'Ubqe9bgMq3KQoukRpSbOk2E4X9YSJGmCDbLwSic6'
			})
		}).then(function (response) {
			if (response.ok) { // in the first then we ask from the server a response
				return response.json();
			}
		}).then(function (json) {
			members = json.results[0].members; //grab data
			showPage();
			removeUndefined(members);
			removeUndefinedMised(members);
			deleteNull(members);
               console.log(members);
			statistics =

				{

					"numbOfDem": calcLengthAndStore("D"),
					"numbOfRep": calcLengthAndStore("R"),
					"numbOfInd": calcLengthAndStore("I"),
					"DemPerc": calculateAverageVotes("D") / calcLengthAndStore("D"),
					"Indperc": calculateAverageVotes("I") / calcLengthAndStore("I"),
					"Repperc": calculateAverageVotes("R") / calcLengthAndStore("R"),
				};

			//Loyalty values
			topLoy = sortArrayToBottom("votes_with_party_pct");
			bottomLoy = sortArrayToTop("votes_with_party_pct");
			

			//engage values
			mono = sortArrayToTop("missed_votes_pct");
			bottom = sortArrayToBottom("missed_votes_pct");
			createTable();
//const stat = Object.keys(statistics).map(i => statistics[i]);
trigTables();
})
		.catch(function (error) {
			console.log(error);
		})
}

getData();

//calculate array length for each party
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

function removeUndefined(array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].votes_with_party_pct == undefined) {
			array[i].votes_with_party_pct = 0;
		}
	}
}


//method to replace null with zero

function removeUndefinedMised(array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].missed_votes === null) {
			array[i].missed_votes = 0;
		}
	}
}

function deleteNull(array) {

	for (var i = 0; i < array.length; i++) {
		if (array[i].missed_votes_pct === undefined) {
			array[i].missed_votes_pct = 0;
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



function getTenPerOfMissed(array) {

	var tempArray = [];
	var len = array.length * 0.1;
	for (var i = 0; i < array.length; i++) {
		if (i < len) {
			tempArray.push(array[i]);
		} else if (array[i].missed_votes_pct == array[i + 1].missed_votes_pct) { //find the 10% of the lowest values and keep also values that                                                                               repeated
			tempArray.push(array[i]);
		} else {
			break;
		}
	}

	return tempArray;
}



function sortArrayToBottom(sortKey) {
	members.sort(function (a, b) {
		return b[sortKey] - a[sortKey]
	});
	return getTenPerOfMissed(members);

}


function sortArrayToTop(sortKey) {
	members.sort(function (a, b) {
		return a[sortKey] - b[sortKey]
	});
	return getTenPerOfMissed(members);

}

// show hide loader
function showPage() {
document.getElementById("loader").style.display = "none";
document.getElementById("test").style.display = "block";
		}


function createTable() {


	var k = '<tbody>'
	for (var i = 0; i < 1; i++) { //if middle name is null hide it
        k += '<tr>';
		k += '<td>' + "Democrats" + '</td>';
		k += '<td>' + statistics["numbOfDem"] + '</td>';
		k += '<td>' + statistics["DemPerc"].toFixed(2) + '</td>';
		k += '</tr>';
		//	    k += '<td>' + array[i].last_name + '</td>';
		k += '<tr>';
		k += '<td>' + "Republicants" + '</td>';
		k += '<td>' + statistics["numbOfRep"] + '</td>';
		k += '<td>' + statistics["Repperc"].toFixed(2) + '</td>';
		k += '</tr>';
		k += '<tr>';
		k += '<td>' + "Indep" + '</td>';
		k += '<td>' + statistics["numbOfInd"] + '</td>';
		k += '<td>' +  statistics["Indperc"].toFixed(2) + '</td>';
		k += '</tr>';

}

	k += '</tbody>';
	document.getElementById("tableData").innerHTML = k;



}
function create_second_Table(array, table) {
	var k = '<tbody>'
	for (var i = 0; i < array.length; i++) {

		k += '<tr>';
		k += '<td>' + array[i].first_name + " " + array[i].last_name + '</td>';
		k += '<td>' + array[i].missed_votes + '</td>';
		k += '<td>' + array[i].missed_votes_pct + "%" + '</td>';
		k += '</tr>';
	}

	k += '</tbody>';
	document.getElementById(table).innerHTML = k;
}

function LoyaltTables(array, table) {
	var k = '<tbody>'
	for (var i = 0; i < array.length; i++) {

		k += '<tr>';
		k += '<td>' + array[i].first_name + " " + array[i].last_name + '</td>';
		k += '<td>' + array[i].total_votes + '</td>';
		k += '<td>' + array[i].votes_with_party_pct + "%" + '</td>';
		k += '</tr>';
	}
	k += '</tbody>';
	document.getElementById(table).innerHTML = k;
}


function trigTables() {
	if (location.pathname == "/house_calculations.html") {
		create_second_Table(bottom, "table_second");
		create_second_Table(mono, "table_third");

	} else if (location.pathname == "/house_loyalty.html") {
		LoyaltTables(topLoy, "table_loyalt");
		LoyaltTables(bottomLoy, "table_loyalt_sec");
	}
}
