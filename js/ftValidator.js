/********************* 
Author: Laura Grisales
Date: 05/02/2019 
**********************/
//GLOBAL VARIABLES
var arrMessages = ["Revise los campos"];
var obj;
var arrObject = new Array();
var strValues='{';

/* GETSECTION FUNTION
Description: Search all the sections and identify all the inputs that belong to it.
*/
function getSection(section) {
    let elemSection = document.querySelectorAll('section');
    console.log(elemSection);
    let elemForms = elemSection[section].querySelectorAll('form');
    let validForm = true;
    for (let i = 0; i < elemForms.length; i++) {
        for (let j = 0; j < elemForms[i].length; j++) {
            let elemRequired = elemForms[i][j].required;
            let elemType = elemForms[i][j].type;
            let elemValue = elemForms[i][j].value;
            let object = elemForms[i][j];
            let elementId = elemForms[i][j].id;
            if (elemRequired) {

                if (elemType == "text") {
                    validForm = validInput(elemValue);
                }
                if (elemType == "number") {
                    validForm = validInput(elemValue);
                }
                if (elemType == "email") {
                    if (validInput(elemValue)) {
                        validForm = validEmail(elemValue);
                    } else {
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
            strValues+='"'+elementId+'":"'+elemValue+'",';
            /*End Update*/
        }
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

/* VALIDINPUT FUNTION
Description: Receives the required element and verifies that it is not empty.
*/
function validInput(element) {
    let validate = true;
    let 
    if (element.length == 0 || element == null || element == "") {
        validate = false;
    }
    return validate;
};
// END VALIDINPUT

/* VALIDEMAIL FUNTION
Description: Receive the required element and verifies that it has the email type structure.
*/
function validEmail(element) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(element);
};
// END VALIDEMAIL

/* ALERTVIEW FUNTION
Description: Receive the position of the message that will be displayed.
*/
function alertView(index) {
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