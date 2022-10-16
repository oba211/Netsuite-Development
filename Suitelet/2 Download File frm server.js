/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(["N/ui/serverWidget", "N/https", "N/file"], (ui,https,file)=>{
  
   return{
        onRequest: const onRequest = (context) =>{
        try
        {
            var fileReq = https.request({
                method: https.Method.GET,
                url: 'server url',
            });
          
            var fileresponsebody = fileReq.body;
          
            var fileObj = file.create({
                name: 'fileName.txt',
                fileType: file.Type.PLAINTEXT,
                contents: fileresponsebody,
                folder: 678 //internal id of folder where u want to store files
            });

            var id = fileObj.save();
        }
        catch(e)
        {
            log.error("error in Main Function",e.message);
        }
    }
}
});
