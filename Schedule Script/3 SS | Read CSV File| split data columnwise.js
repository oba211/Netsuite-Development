//if column field contain comman then it will ignore

/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */

define(['N/file'], (file) => {
    function execute() {
        try {
            var fileObj = file.load({
                id: 9179
            })
            
            var csvLines = fileObj.getContents().split('\n');
            for (var i = 1; i < csvLines.length; i++) 
            {
                if (i == 1) {
                    var cells = (csvLines[i] + ',').split(/(?: *?([^",]+?) *?,|" *?(.+?)" *?,|( *?),)/).slice(1).reduce((a, b) => (a.length > 0 && a[a.length - 1].length < 4) ? [...a.slice(0, a.length - 1), [...a[a.length - 1], b]] : [...a, [b]], []).map(e => e.reduce((a, b) => a !== undefined ? a : b, undefined))
                    log.debug('row data', cells);

                    for (var j = 0; j < cells.length; j++) {
                        log.debug("column=" + j, cells[j]);
                    }
                }
            }
        } catch (e) {
            log.error("error in execute function ", e.message);
        }
    }
    return {
        execute: execute

    };
});
