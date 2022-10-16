/*
  1 Add HTML File in file cabinet and load file with Internal Id in suitelet
  Below snippet Help you to create HTML page in Netsuite Using Suitelet
  pull request....Happy Coding :) 
*/

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 * @author Pushpa Kale
 */

 define(['N/record', 'N/redirect', 'N/ui/serverWidget','N/url','N/file','N/render'],
 /**
  * @param {record} record
  * @param {redirect} redirect
  * @param {serverWidget} serverWidget
  */
 function (record, redirect, serverWidget,url,file,render) {

     function onRequest(context) {
         try {
             var request = context.request;
             var response = context.response;

            var templateFile = file.load({
                id: 10187
            });

            var pageRenderer = render.create();
            pageRenderer.templateContent = templateFile.getContents();
  
            var renderedPage = pageRenderer.renderAsString();

            response.write(renderedPage);

        } catch (error) {
            log.error('Error in Main Function', error.message);
        }
    }

    return {
        onRequest: onRequest
    };

});
