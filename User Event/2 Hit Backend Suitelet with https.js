/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
 define(['N/record' ,'N/url', 'N/https'],
 function(record, url, https){
	 function afterSubmit(context){
		  try {
			  
           log.debug({
               title: 'The Record Has testing sale order',
               details: 'afterSubmit Triggered'
           });

		   if(context.type === context.UserEventType.APPROVE)
           {
            //log.debug("context.type",context.type);
            //log.debug("context.UserEventType.APPROVE",context.UserEventType.APPROVE);

            var soRecordId= context.newRecord.id;
            log.debug("soRecordId",soRecordId);

            var suiteletUrl = url.resolveScript({
                scriptId: 'customscriptsdr_suitelet_create_if', 
                deploymentId: 'customdeploysdr_suitelet_create_if' , 
                returnExternalUrl:true
            })+'&soRecordId='+soRecordId;
            log.debug("suiteletUrl",suiteletUrl);

            //10 unit
            var response = https.get({
                url: suiteletUrl,
            });
            log.debug(" response", response);

           }//if 
		   
		    }//try
			catch (e) {
            log.error({
                title: 'Error',
                details: e
            });
        }
    }


    return {
        afterSubmit: afterSubmit
    };

});



/****************************************************************************************************************************************************************/


/**
* @NApiVersion 2.x
* @NScriptType Suitelet
*/

define([ 'N/record' ,'N/redirect','N/runtime'],
 function( record,redirect,runtime)
  {
      function onRequest(context) {

        if (context.request.method === 'GET')
        {
                    log.debug("ue calling suitelet successfully");
                
                    var scriptObj = runtime.getCurrentScript();

                    var so_id = context.request.parameters.soRecordId;
                    log.debug("so_id", so_id);

                    if( !!so_id )
                    {
                        //10 unit
                        var IFRecord = record.transform({
                            fromType: record.Type.SALES_ORDER,
                            fromId:  so_id,
                            toType:record.Type.ITEM_FULFILLMENT,
                            isDynamic: true,
                        });
                        log.debug(" IFRecord", IFRecord);

                        IFRecord.setValue({fieldId:'shipstatus', value:'C'});
                        
                        //20unit
                        var ifId= IFRecord.save();
                        log.debug("ifId",ifId);


                      /*  redirect.toRecord({
                            type: record.Type.ITEM_FULFILLMENT,
                            id: ifId
                         });
                        */

                    } 
                    log.debug('Remaining governance units: ' + scriptObj.getRemainingUsage());   
                }  
        }
        return {
            onRequest: onRequest
        };

});
