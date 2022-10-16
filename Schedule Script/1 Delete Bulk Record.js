/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @Author Pushpa Kale
 */

define(['N/search', 'N/record',  'N/runtime',  'N/task'],
   function (search, record,  runtime,  task) {

      function execute(context) {
         try {

            var scriptObj = runtime.getCurrentScript();

            var itemSearchObj = search.create({
               type: "",
               filters:
                  [
                  ],
               columns:
                  [
                     search.createColumn({ name: "internalid", label: "Internal ID" }),

                  ]
            });
            var searchResultCount = itemSearchObj.runPaged().count;
            log.debug("itemSearchObj result count", searchResultCount);

            log.debug("scriptObj.getRemainingUsage();", scriptObj.getRemainingUsage());

          itemSearchObj.run().each(function (result) {

               if (scriptObj.getRemainingUsage() > 20) {

                  // .run().each has a limit of 4,000 results
                  record.delete({
                     type: '',
                     id: result.getValue({
                        name: 'internalid'
                     })
                  })
                  return true;

               }
               else {
                 
                  var scriptDeployId = runtime.getCurrentScript().deploymentId;
                 
                  var scheduledScriptTask = task.create({
                     taskType: task.TaskType.SCHEDULED_SCRIPT,
                     scriptId: 'currScriptId',
                     deploymentId:scriptDeployId ,
                  });
                 
                  scheduledScriptTask.submit();
                  return;

               }

            });

         }
         catch (e) {
            log.error("error in Execute Function ", e.message);
         }

      }
      return {
         execute: execute,
      }

   });
