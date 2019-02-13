/********************* 
Author: Laura Grisales
Date: 05/02/2019 
**********************/
//GLOBAL VARIABLES
var arrMessages = ["Revise los campos"];
var obj;
var arrObject = new Array();
var strValues='{';

/* GETSECTION FUNCTION
Description: Search all the sections and identify all the inputs that belong to it.
*/
function getSection(section,button) { 
  let elemSection = document.querySelectorAll('section');
  let elemForms = elemSection[section].querySelectorAll('form');
  let validForm = true;
  for (let i = 0; i < elemForms.length; i++) {
    for (let j = 0; j < elemForms[i].length; j++) {
      let elemRequired = elemForms[i][j].required;
      let elemType = elemForms[i][j].type;
      let elemValue = elemForms[i][j].value;
      let object = elemForms[i][j];
      let elemId = elemForms[i][j].id;
      let elemName = elemForms[i][j].name;
      if (elemRequired) {
        if (elemType == "text") {
          validForm = validInput(elemValue);
        }
        if (elemType == "number") {
          validForm = validInput(elemValue);
        }
        if (elemType == "date") {
          validForm = validInput(elemValue);
        }
        if (elemType == "radio") {
          validForm = validRadio(elemName);
        }
        if (elemType == "email") {
          if (validInput(elemValue)) {
            validForm = validEmail(elemValue);
          }
          else {
            validForm = false;
          }
        }
        if (!validForm) {
          object.focus();
          alertView(0);
          return false;
        }        
      }
            /*
            Author: Diego Casallas
            Update: 12/02/2019 
            */
            strValues+='"'+elemId+'":"'+elemValue+'",';
            /*End Update*/
        }
    }
    if (validForm) {
      enableForm(button);
    }
    /*
    Author: Diego Casallas
    Update: 12/02/2019 
    */
    strValues=strValues.substring(0,strValues.length-1);
    strValues+='}';
    obj = JSON.parse(strValues);
    console.log(obj);
    /*End Update*/
    
};
// END GETSECTION 

/* ENABLEFORM FUNCTION
Description: Receives the button to enable the next section
*/
function enableForm(button) {
  let btn = "btnSubmit" + button;
  let btnEnabled = document.getElementById(btn).disabled = false;
}
// END ENABLEFORM

/* VALIDINPUT FUNCTION
Description: Receives the required element and verifies that it is not empty.
*/
function validInput(element) {
    let validate = true;
    if (element.length == 0 || element == null || element == "") {
        validate = false;
    }
    return validate;
};
// END VALIDINPUT

/* VALIDEMAIL FUNCTION
Description: Receive the required element and verifies that it has the email type structure.
*/
function validEmail(element) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(element);
};
// END VALIDEMAIL

/* VALIDRADIO FUNCTION
Description: Receives the radio's name and search if one of the radio is checked in that group's name
*/
function validRadio(element) {
  let elemChecked = document.getElementsByName(element);
  let check = 0;
  let validate = false;
  for (let i = 0; i < elemChecked.length; i++) {
    if (elemChecked[i].checked) {
      check++;
    }
    if (check > 0) {
      validate = true;
      break;
    }
  }
  return validate;
};
  // FIN VALIDRADIO

/* ALERTVIEW FUNCTION
Description: Receive the position of the message that will be displayed.
*/
function alertView(index) {
    alert(arrMessages[index]);
};
// FIN ALERTVIEW

/* VIEWMODALITEM FUNCTION
Author: Diego Casallas
Date: 06/02/2019
Description: Receive the modal that will be visible and the other modal will be invisible.
*/
function viewModalItem(index) {
    var id = "panelItem_" + index;
    var itemClass = document.getElementsByClassName('panelItems');
    for (var i = 0; i < itemClass.length; i++) {
        itemClass[i].classList.remove("visible");
        itemClass[i].classList.add("invisible");
    }
    document.getElementById(id).classList.remove("invisible");
    document.getElementById(id).classList.add("visible");
};
// FIN VIEWMODALITEM