var f = document.getElementById("middle_name");
var p = document.getElementById("democracy");
var r = document.getElementById("rep");
var ind = document.getElementById("Indep");
select = document.getElementById("select_states");
//var members;

getData();


function getData() {
	var fetchConfig =
		fetch("https://api.propublica.org/congress/v1/115/house/members.json", {
			method: "GET",
			headers: new Headers({
				"X-API-Key": 'Ubqe9bgMq3KQoukRpSbOk2E4X9YSJGmCDbLwSic6'
			})
		}).then(function (response) {
			if (response.ok) {
				return response.json();
			}
		}).then(function (json) {
			members = json.results[0].members;
			getCities(removeDuplicates(members));

			select.addEventListener("change", addFilters);
			p.addEventListener("click", addFilters);
			r.addEventListener("click", addFilters);
			ind.addEventListener("click", addFilters);


		})
		.catch(function (error) {
			console.log(error);
		})
}



function createTable(array) {
	var k = '<tbody>'
	for (var i = 0; i < array.length; i++) { //if middle name is null hide it
		if (array[i].middle_name == null) {
			k += '<tr>';
			k += '<td>' + array[i].first_name + " " + array[i].last_name + '</td>';
			k += '<td>' + array[i].party + '</td>';
			k += '<td>' + array[i].state + '</td>';
			k += '<td>' + array[i].seniority + '</td>';
			k += '<td>' + array[i].votes_with_party_pct + '</td>';

			k += '</tr>';
		} else { //else if middle name has value show it on the table

			k += '<tr>';
			k += '<td>' + array[i].first_name + " " + array[i].middle_name + array[i].last_name + '</td>';
			k += '<td>' + array[i].party + '</td>';
			k += '<td>' + array[i].state + '</td>';
			k += '<td>' + array[i].seniority + '</td>';
			k += '<td>' + array[i].votes_with_party_pct + '</td>';

			k += '</tr>';

		}
	}
	k += '</tbody>';
	document.getElementById("tableData").innerHTML = k;
}





function addFilters() {

	var newArray = [];

	for (var i = 0; i < members.length; i++) {

		if (select.value == members[i].state || select.value == "ALL") {
			if (p.checked == true && members[i].party === "D") {
				newArray.push(members[i]);

			}
			if (r.checked == true && members[i].party === "R") {

				newArray.push(members[i]);
			}
			if (ind.checked == true && members[i].party === "I") {

				newArray.push(members[i]);

			}


		}
	}

	createTable(newArray);
}

//call two methods emppeded


function getCities(filteredMembers) {
	filteredMembers.forEach(function (arr) {
		var opt = arr;
		//		var select = document.querySelector('select');
		var el = document.createElement("option"); //create option
		el.textContent = opt.state; //create text space
		el.value = opt.state;
		select.appendChild(el); //assign the text
	})
}


function removeDuplicates(arr) {

	var unique_array = [];
	var tempArr = [];

	arr.forEach(function (item) {
		if (tempArr.indexOf(item.state) == -1) {
			unique_array.push(item);
			tempArr.push(item.state);
		}


	});
	return unique_array;
}


