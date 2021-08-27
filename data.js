const excelToJson = require('convert-excel-to-json');

    const result = excelToJson({
        sourceFile: 'Source/TestData.xlsx',
        header:{
            rows: 1 
        },
        sheets:[{
            name: 'Login',
            columnToKey: {
                A: 'Url',
                B: 'UserName',
                C:'Password'
            }
        },{
            name: 'Account',
            columnToKey: {
                A: 'Fields',
                B: 'Value',
            }
        },{
            name: 'Opportunity',
            columnToKey: {
                A: 'Fields',
                B: 'Value',
            }
        },{
            name: 'Contact',
            columnToKey: {
                A: 'Fields',
                B: 'Value',
            }
        }]
        
    });


    module.exports = {
        result
    };
