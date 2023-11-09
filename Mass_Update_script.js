/**
 *@NApiVersion 2.1
 *@NScriptType MassUpdateScript
 */
 define(['N/record'], (record) => {
    function each(params) {

        let recOpportunity = record.delete({
            type: params.type,
            id: params.id
        });
       
        log.debug("rec deleted successfully",params.id);
    }
    return {
        each: each
    };
});


//if comapny imported data via csv and now they want to add new field and update it 

// If your task is a one-time bulk update, a mass update script is more suitable.
// If your task requires periodic or scheduled execution, opt for a scheduled script to automate the process.
