/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 * @author Pushpa Kale
 */

define(["N/search", "N/ui/serverWidget"], function (search, ui) {
    function onRequest(context) {
        if (context.request.method === "GET") {
            var form = ui.createForm({ title: "Custom Form Test" });

            var inlineHTMLField = form.addField({
                id: 'custpage_inlinehtml',
                type: ui.FieldType.INLINEHTML,
                label: 'html'
            });
            inlineHTMLField.defaultValue = '<form id="my-form" method="post">' +
                '<label for="name">Name:</label>' +
                '<input type="text" id="name" name="name" required>' +
                '<label for="email">Email:</label>' +
                '<input type="email" id="email" name="email" required>' +
                '<button type="submit">Submit</button>' +
                '</form>';
            context.response.writePage(form);
        }
        else {
            var name = context.request.parameters.name;
            var email = context.request.parameters.email;
            log.debug('Name:', name);
            log.debug('Email:', email);
        }
    }

    return {
        onRequest: onRequest,
    };
});
