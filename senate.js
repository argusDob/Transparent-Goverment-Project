//getData();
var app = new Vue({ //Vue Object
	el: "#app", //specifie HTML ID   
	data: {
		// in data we store data from the web
		members: [],
		filteredArray: [],
		states: [],



	},
	created: function () {
		this.getData();
	},
	methods: {
		test: function () {
			app.filteredArray = [];
			d = document.getElementById("democracy");
			r = document.getElementById("repu");
			indip = document.getElementById("ind");
			select = document.getElementById("select_states");

			//			app.filteredArray = [];
			for (var i = 0; i < app.members.length; i++) {

				if (select.value == app.members[i].state || select.value == "ALL") {
					if (d.checked == true && app.members[i].party == "D") {

						app.filteredArray.push(app.members[i]);

					}

					if (r.checked == true && app.members[i].party == "R") {

						app.filteredArray.push(app.members[i]);

					}

					if (indip.checked == true && app.members[i].party == "I") {

						app.filteredArray.push(app.members[i]);

					}

				}

			}

		},
		removeDuplicates: function (array) {
			var unique_array = [];
			var tempArr = [];

			array.forEach(function (item) {
				if (tempArr.indexOf(item.state) == -1) {
					unique_array.push(item);
					tempArr.push(item.state);
				}
			});
			app.states = tempArr;
		},
		getData: function () {
			var fetchConfig =
				fetch("https://api.propublica.org/congress/v1/115/senate/members.json", {
					method: "GET",
					headers: new Headers({
						"X-API-Key": 'Ubqe9bgMq3KQoukRpSbOk2E4X9YSJGmCDbLwSic6'
					})
				}).then(function (response) {
					if (response.ok) {
						return response.json();
					}
				}).then(function (json) {

					app.members = json.results[0].members;
					app.removeDuplicates(app.members);

					deleteUn();
				})
				.catch(function (error) {
					console.log(error);
				})
		}
	}
})


function deleteUn() {

	for (var i = 0; i < app.members.length; i++) {
		if (app.members[i].middle_name === undefined) {
			app.members[i].middle_name = "";
		}
	}
}
