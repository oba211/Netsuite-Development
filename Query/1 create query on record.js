 /*
 Below Snippet Helps you to create query in script which return more than 5000 result
 */
 
 function allAssocitationDataQuery(custRecId) {

        var myCustomerQuery = query.create({
            type: ""  //add record type
        });

        var firstCondition = myCustomerQuery.createCondition({
            fieldId: 'isInactive',
            operator: query.Operator.IS,
            values: false
        });

        var secondCondition = myCustomerQuery.createCondition({
            fieldId: '',
            operator: query.Operator.INCLUDE_EXACTLY,
            values: 
        });

        myCustomerQuery.condition = myCustomerQuery.and(
            firstCondition, secondCondition);

        var internalId =
            myCustomerQuery.createColumn({
                fieldId: 'id'
            })

        myCustomerQuery.columns = [internalId];

        var myPagedResults = myCustomerQuery.runPaged({
            pageSize: 1000
        });

        // log.debug("myPagedResults.count", myPagedResults.count);

        var allRecArrId = [];

        let iterator = myPagedResults.iterator();
        iterator.each(function (result) {
            var recRes = result.value.data.results;
            for (var i = 0; i < recRes.length; i++) {
                allRecArrId.push(recRes[i].values[0]);
            }
            return true;
        })
      

        return allRecArrId;

    }
