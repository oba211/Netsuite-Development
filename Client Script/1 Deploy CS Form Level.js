// In some cases, you might want to deploy a client script on only one form.
// You can attach a client script to a custom entry form, a custom transaction form, or a custom address form.

// With both custom entry forms and custom transaction forms, you can also include logic in the 
// script to create a custom action such as a button or a menu item. For custom address forms, 
// you can deploy the script on the form, but you cannot configure custom actions.

/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
 define([],function () {

     function pageInit(context) {
        alert("form level testing");

        var currRec=context.currentRecord;
        currRec.setValue("memo","testing")

        const myRecordFieldB = currRec.getField({
            fieldId: 'memo'
        });

        myRecordFieldB.isDisabled = true;


     }

     function customButton(){
        alert("button level testing");

     }
     function customMenu(){
        alert(" cutom menu/action  testing");

     }

     return {
         pageInit: pageInit,
         customButton:customButton,
         customMenu:customMenu
    
     }
 });
