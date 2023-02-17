/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/ui/serverWidget'], function (serverWidget) {

    function onRequest(context) {

        var form = serverWidget.createForm({
            title: 'Location Map'
        });

        // Add a link to the Google Maps website
        var link = form.addField({
            id: 'custpage_map_link',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'Map'
        });
        link.defaultValue = '<a href="https://www.google.com/maps/place/1600+Amphitheatre+Parkway,+Mountain+View,+CA+94043/">View on Google Maps</a>';

        var mapDiv = '<div id="map" style="height: 500px;"></div>';

        var mapField = form.addField({
            id: 'custpage_map',
            type: serverWidget.FieldType.INLINEHTML,
            label: 'Map'
        });
        mapField.defaultValue = mapDiv;

        context.response.writePage(form);


    }

    return {
        onRequest: onRequest
    };
});
