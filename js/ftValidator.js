/* GLOBAL VARIABLES
Author: Laura Grisales
Date: 05/02/2019 
*/
var arrMessages = ["Revise los campos"];

/* GETSECTION FUNTION
Author: Laura Grisales
Date: 05/02/2019
Description: Search all the sections and identify all the inputs that belong to it.
*/
function getSection(section){
  let elemSection = document.querySelectorAll('section');
  console.log(elemSection);      
  let elemForms = elemSection[section].querySelectorAll('form');
  let validForm = true;
  for (let i = 0; i < elemForms.length; i++) {
    for (let j = 0; j < elemForms[i].length; j++) {
      let elemRequired = elemForms[i][j].required;
      console.log(elemRequired);          
      if (elemRequired) {
        let elemType = elemForms[i][j].type;
        let elemValue = elemForms[i][j].value;
        let object = elemForms[i][j];
        if (elemType == "text") {
          validForm = validInput(elemValue);
        }
        if (elemType == "number") {
          validForm = validInput(elemValue);
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
    }
  }     
};
// END GETSECTION 

/* VALIDINPUT FUNTION
Author: Laura Grisales
Date: 05/02/2019
Description: Receives the required element and verifies that it is not empty.
*/
function validInput(element){
  let validate = true;
  if(element.length == 0 || element == null || element == ""){
    validate = false;
  }
  return validate;
};
// END VALIDINPUT

/* VALIDEMAIL FUNTION
Author: Laura Grisales
Date: 05/02/2019
Description: Receive the required element and verifies that it has the email type structure.
*/
function validEmail(element){
  var re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(element);
};
// END VALIDEMAIL

/* ALERTVIEW FUNTION
Author: Laura Grisales
Date: 05/02/2019
Description: Receive the position of the message that will be displayed.
*/
function alertView(index){
  alert(arrMessages[index]);
};
// FIN ALERTVIEW

/* VIEWMODALITEM FUNTION
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
