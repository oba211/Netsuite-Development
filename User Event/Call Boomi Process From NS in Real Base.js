/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */

 define(['N/record', 'N/https', 'N/encode'],

 function (record, https, encode) {
     function afterSubmit(context) {
         try {
             const BOOMI_URL = '';
             const BOOMI_USER = '';
             const BOOMI_PASSWORD = '';
             const arBoomiHeader = {};

             let sAuthorizationString = encode.convert({
                 string: BOOMI_USER + ':' + BOOMI_PASSWORD,
                 inputEncoding: encode.Encoding.UTF_8,
                 outputEncoding: encode.Encoding.BASE_64
             });
             arBoomiHeader['Content-Type'] = 'application/json';
             arBoomiHeader["Authorization"] = "Basic " + sAuthorizationString;

             let response = https.post({
                 url: BOOMI_URL,
                 body: JSON.stringify({ "internalid": context.newRecord.id }),
                 headers: arBoomiHeader
             });

             log.debug("response code", response.code);
             log.debug("response body", response.body);

         } catch (e) {
             log.error("error in afterSubmit function", e.message);
         }

     }

     return {
         afterSubmit: afterSubmit
     };

 });
