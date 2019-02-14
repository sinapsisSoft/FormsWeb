/* GETDATAITEMS FUNTION
Author: Diego Casallas
Date: 06/02/2019
Description: Validate and add the elements of the modals.
*/
var idPanel="";
var numCellRow=0;
/* VIEWMODALITEM FUNCTION
Description: Receive the modal that will be visible and the other modal will be invisible.
*/
function viewModalItem(index) {
	idPanel=index;
	let panel="panelItem_"+index;
	var itemClass = document.getElementsByClassName('panelItems');
	for (var i = 0; i < itemClass.length; i++) {
		itemClass[i].classList.remove("visible");
		itemClass[i].classList.add("invisible");
	}
	document.getElementById(panel).classList.remove("invisible");
	document.getElementById(panel).classList.add("visible");
};
// FIN VIEWMODALITEM
function getDataItems() {
	var valueList = new Array();
	var table;
	var idForm = "#panelItem_" + idPanel;
	var elemens = document.querySelector(idForm);
	var forms = elemens.querySelectorAll('form');
	var validate = true;
	var count = 0;
	var listTable = new Array('tableProperty', 'tableVehicle', 'tableBeneficiaries');
	var table = document.getElementById(listTable[idPanel]);
	listDataTableValue = [];
	//getSection(section); //Pendiente revisar desde aca
	for (var i = 0; i < forms.length; i++) {
		for (var j = 0; j < forms[i].length; j++) {
			var elementValue = forms[i][j].value;
			var elementType = forms[i][j].type
			var elementsRequire = forms[i][j].required;
			var element = forms[i][j];
			var nameElement = element.name;
			if (elementType == "text" && elementsRequire) {
				if (elementValue == null || elementValue == "" || elementValue.length == 0) {
					validate = false;
					element.classList.add('validateError');
					break;

				} else {
					listDataTableValue[count] = elementValue;
					validate = true;
					count++;
					element.classList.remove('validateError');
				}
			} else {
				if (elementType == "text") {
					listDataTableValue[count] = elementValue;
					count++;
				}
			}
			if (elementType == "radio" && elementsRequire) {
				if (validRadio(nameElement)) {
					if (element.checked) {
						validate = true;
						listDataTableValue[count] = elementValue;
						count++;
					}
				} else {
					validate = false;
					break;
				}
			}
		}
	}

	if (validate) {
		selectCreateCondition(table, listDataTableValue);
		//cleanItem();
		$('#myModal').modal('hide');
	} else {
		alert("Verifique los campos");
		listDataTableValue = [];
	}
};

function selectCreateCondition(table, data) {
	var newRow;

	newRow = table.insertRow(table.rows.length);
	newRow.id = numCellRow;

	if (table.id == "tableProperty") {
		newRow.className = "dataRowProperty";
	} else if (table.id == "tableVehicle") {
		newRow.className = "dataRowVehicle";
	}

	for (var j = 0; j <= data.length; j++) {
		var newCell = newRow.insertCell(j);
		// Append a text node to the cell
		if (j == data.length) {
			var newButton = document.createElement('span');
			newButton.innerHTML = '<button class="btn btn-danger btn-sm" title="Eliminar Item"  onclick="deleteCell(' + numCellRow + ')" >x</button>';
			newCell.appendChild(newButton);
			numCellRow++;
		} else {
			newCell.appendChild(document.createTextNode(data[j]));
		}
	};
};
function deleteCell(data){

	alert(data);
}