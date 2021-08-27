const jsforce = require("jsforce");
let conn ={};
let fieldsMap = new Map();

let login = function(url,username,password,securitytoken) {
   
    conn = new jsforce.Connection({
        version: "48.0",
        loginUrl:url,//Get Current LoggedIN Session ID for Api Calls
    }); 

    return new Promise(async (resolve, reject) => {
        conn.login(username,password,
            function (err, userInfo) {
                if(err)
                    console.log(err);

                resolve(conn);
            }
        ); 
    }); 
}

let getFieldNameWithType = function(objectName) {
    return new Promise(async (resolve, reject) => {
            conn.describe(objectName, function(err, meta) {
                if (err) { return console.error(err); }
                for(var item of meta.fields){
                    if(!item.name.includes('__c') && item.type == 'reference' && item.label.includes('ID')){
                        item.label = item.label.replace('ID','Name');
                    }
                    fieldsMap.set(item.label,item.type);
                    fieldsMap.set(item.name,item.type);
                }
                resolve(fieldsMap);

            });
        });
};

const getFieldConfigs = async function(url,username,password,securitytoken,objectName){
    
    await login(url,username,password,securitytoken);
    let fieldsMap = await getFieldNameWithType(objectName);
    return fieldsMap;
   
};




module.exports = {
    getFieldConfigs
}