/* GETDATAITEMS FUNTION
Author: Diego Casallas
Date: 06/02/2019
Description: Validate and add the elements of the modals.
*/
var idTable = 0;
var Objpanel;

function viewModalItem(select) {
	idTable = select;
	Objpanel = "panelItem_" + idTable;
	var itemClass = document.getElementsByClassName('panelItems');
	for (var i = 0; i < itemClass.length; i++) {
		itemClass[i].classList.remove("visible");
		itemClass[i].classList.add("invisible");
	}
	document.getElementById(Objpanel).classList.remove("invisible");
	document.getElementById(Objpanel).classList.add("visible");
};
function getDataItems() {

	var elemens = document.querySelector("#" + Objpanel);
	var objForms = elemens.querySelectorAll('form');
	validateForm(objForms);
};
function validateForm(forms) {
	let listDataTableValue = [];
	let intCount = 0;
	let validForm = true;

	for (let i = 0; i < forms.length; i++) {
		for (let j = 0; j < forms[i].length; j++) {
			let elemValue = forms[i][j].value;
			let elemType = forms[i][j].type
			let elemRequired = forms[i][j].required;
			let element = forms[i][j];
			let elemName = element.name;
			let boolValidateRadio=false;
			if (elemRequired) {
				if (elemType == "text") {
					validForm = validInput(elemValue);
				}
				if (elemType == "number") {
					validForm = validInput(elemValue);
				}
				if (elemType == "radio") {
					validForm = validRadio(elemName);
					if(validForm){
						boolValidateRadio=true;
					}
				}
				if (!validForm) {
					element.focus();
					alert("");
					listDataTableValue=[];
					return false;
				}else{
					if(!boolValidateRadio){
					listDataTableValue[intCount] = elemValue;
					intCount++;	

					}
					else{
						if(element.checked){
							listDataTableValue[intCount] = elemValue;
							console.log(element.checked);
							intCount++;	
						}
						

					}
					
				}
			}
			
		}
	}
	createRowTable(listDataTableValue);
}
function createRowTable(dataRow) {
	let objTable = getTable();
	
	let numLengthTable = objTable.rows.length;
	let newRow = objTable.insertRow(numLengthTable);
	newRow.id = objTable.id+"Row_" + numLengthTable;
	for (let i = 0; i <= dataRow.length; i++) {
		let newCell = newRow.insertCell(i);
		if (i == dataRow.length) {
			let newButton = document.createElement('span');
			newButton.innerHTML =
				'<button class="btn btn-danger btn-sm" title="Eliminar Item"  onclick="deleteCell(' +
				numLengthTable + ','+idTable+')" >x</button>';
			newCell.appendChild(newButton);

		} else {
			newCell.appendChild(document.createTextNode(dataRow[i]));
		}
	}


}
function getTable() {
	let arraListTable = new Array('tableProperty', 'tableVehicle', 'tableBeneficiaries');
	return objTable = document.getElementById(arraListTable[idTable]);

}

function deleteCell(data,tableId) {
	idTable=tableId;
	let objTable = getTable();
	let objTr = objTable.querySelectorAll('tr');
	for (let i = 0; i < objTr.length; i++) {
		let objTableRow=objTable.id+"Row_"+ data;
		if (objTableRow == objTr[i].id) {
			let row = document.getElementById(objTableRow);
			row.parentNode.removeChild(row);
			return false;
		}
	}


}
function validInput(element) {
	let validate = true;
	if (element.length == 0 || element == null || element == "") {
		validate = false;
	}
	return validate;
};