//var members = data.results[0].members; //grab data


//var tempArray=[];
//var temp = [];
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
			members = json.results[0].members;
			showPage();
			statistics =

				{

					"numbOfDem": calcLengthAndStore("D"),
					"numbOfRep": calcLengthAndStore("R"),
					"numbOfInd": calcLengthAndStore("I"),
					"DemPerc": calculateAverageVotes("D") / calcLengthAndStore("D"), //object ,We create and we call the function inside  my obj
					"Indperc": calculateAverageVotes("I") / calcLengthAndStore("I"),
					"Repperc": calculateAverageVotes("R") / calcLengthAndStore("R"),


				};

			bottom = TopTenPercent("missed_votes_pct");
			mono = bottomTenPercent("missed_votes_pct");

			//Loyalty
			LoyBottom = TopTenPercent("votes_with_party_pct");
			LoyMono = bottomTenPercent("votes_with_party_pct");
			createTable();
			TrigSenateTable();
		})
		.catch(function (error) {
			console.log(error);
		})
}
getData();






//grab data from pro congress array
//console.log(members)



function calcLengthAndStore(party) {
	var array = [];
	for (var i = 0; i < members.length; i++) {
		if (members[i].party === party) {
			array.push(members[i].party);
		}
	}
	return array.length;
}




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
	var temp = [];
	var len = array.length * 0.1;
	for (var i = 0; i < array.length; i++) {
		if (i < len) {
			temp.push(array[i]);
		} else if (array[i].missed_votes_pct == array[i - 1].missed_votes_pct) { //find the 10% of the lowest values and keep also values that                                                                               repeated
			temp.push(array[i]);
		} else {
			break;
		}
	}

	return temp;
}



function bottomTenPercent(key) {
	members.sort(function (a, b) {
		return a[key] - b[key];
	});
	return getTenPerOfMissed(members);
}

function TopTenPercent(key) {
	members.sort(function (a, b) {
		return b[key] - a[key];
	});
	return getTenPerOfMissed(members);


}

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
		k += '<td>' + statistics["Indperc"].toFixed(2) + '</td>';
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
		k += '<td>' + array[i].missed_votes_pct + '</td>';
		k += '</tr>';
		//	    k += '<td>' + array[i].last_name + '</td>';
	}
	k += '</tbody>';
	document.getElementById(table).innerHTML = k;
}

function createLastTable(array, table) {
	var k = '<tbody>'
	for (var i = 0; i < array.length; i++) {
		k += '<tr>';
		k += '<td>' + array[i].first_name + " " + array[i].last_name + '</td>';
		k += '<td>' + array[i].total_votes + '</td>';
		k += '<td>' + array[i].votes_with_party_pct + '</td>';
		k += '</tr>';
		//	    k += '<td>' + array[i].last_name + '</td>';
	}

	k += '</tbody>';
	document.getElementById(table).innerHTML = k;
}

function TrigSenateTable() {

	if (location.pathname == "/senate_calculations_att.html") {
		create_second_Table(bottom, "table_second");
		create_second_Table(mono, "table_third");
	} else if (location.pathname == "/senate_loya.html") {

		createLastTable(LoyBottom, "table_loy_second");
		createLastTable(LoyMono, "table_loy_third");
	}
}
//TrigSenateTable();
