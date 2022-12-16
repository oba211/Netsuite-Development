/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
 define(['N/ui/serverWidget','N/runtime', 'N/log'],

 function(serverWidget,runtime,log) {
    
     function beforeLoad(scriptContext) {
         try{
             var form = scriptContext.form;
             var link='https://tstdrv2628567.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=954&deploy=1&compid=TSTDRV2628567&h=be9b37f7f5c59707582d';
             const suiteletURL = '\"' + link + '\"';
             form.addButton({
                 id : 'custpage_button_demo',
                 label : 'Save Search',
                 functionName: 'window.open('+suiteletURL+')'
             });        		   	
             
         }catch(e){
             log.error('Error in beforeLoad', e);
         }
     }
 
 
     return {
         beforeLoad: beforeLoad,
         
     };
     
 });
