const { chromium } = require('playwright');
const sf = require("./stdUiComponents");
const jsforce = require("jsforce");
const data = require("./data.js");
let service = require("./service");
let page,login,context,browser;

describe("Sales Cloud Testing", function (done){

    before(async () => {
        browser = await chromium.launch({  args: ['--start-maximized','--start-fullscreen'],headless: false, slowMo: 50 });
        context = await browser.newContext({viewport : null , recordVideo: { dir: 'videos/' } });

        page = await context.newPage();
        [login] = data.result.Login;
        await sf.login(page,login.Url,login.UserName,login.Password);
    });


    it("Account Creation", async () => {
            await sf.gotoTab(page,'Accounts');
            let accFieldsAndType = await service.getFieldConfigs(login.Url,login.UserName,login.Password,login.SecurityToken,'Account');
            let accounts = data.result.Account;
            let recType = '';
            for(var item of accounts){
                    if(item.Fields == 'RecordType'){
                        recType = item.Value;
                    }
            }
            await sf.newButtonClick(page);
            await sf.recordTypeSelection(page,recType);
            for(var item of accounts){
                if(item.Fields == 'RecordType'){
                    continue;
                }
                await sf.assignValueToField(page,item.Fields,item.Value,accFieldsAndType.get(item.Fields));
            }

            await sf.save(page);
    });

    it("Contact Creation", async () => {
        await sf.gotoTab(page,'Contacts');
        let conFieldsAndType = await service.getFieldConfigs(login.Url,login.UserName,login.Password,login.SecurityToken,'Contact');
        let contacts = data.result.Contact;
        let recType = '';
        for(var item of contacts){
                if(item.Fields == 'RecordType'){
                    recType = item.Value;
                }
        }
        await sf.newButtonClick(page);
        await sf.recordTypeSelection(page,recType);

        for(var item of contacts){
            if(item.Fields == 'RecordType'){
                continue;
            }
            await sf.assignValueToField(page,item.Fields,item.Value,conFieldsAndType.get(item.Fields));
        }

        await sf.save(page);
    });

    it("Opportunity Creation", async () => {
        await sf.gotoTab(page,'Opportunities');
        let oppFieldsAndType = await service.getFieldConfigs(login.Url,login.UserName,login.Password,login.SecurityToken,'Opportunity');
        let opportunities = data.result.Opportunity;
        let recType = '';
        for(var item of opportunities){
                if(item.Fields == 'RecordType'){
                    recType = item.Value;
                }
        }
        await sf.newButtonClick(page);
        await sf.recordTypeSelection(page,recType);

        for(var item of opportunities){
            if(item.Fields == 'RecordType'){
                continue;
            }
            await sf.assignValueToField(page,item.Fields,item.Value,oppFieldsAndType.get(item.Fields));
        }

        await sf.save(page);

        await context.close();

        await browser.close();
    });

});