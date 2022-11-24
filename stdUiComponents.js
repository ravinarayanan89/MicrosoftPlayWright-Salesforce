const login = async function(page,url,username,password){
    await page.goto(url);
    await page.fill('#username',username);
    await page.fill('#password',password);
    await page.click("#Login");
}


const gotoTab = async function(page,tabName){
    await page.click("xpath=//span[@class='slds-truncate'][normalize-space()='"+tabName+"']");
}

const newButtonClick = async function(page){
    await page.waitForTimeout(2000); // to clear the browser side DOM.Otherwise it clicks the previous tab new button
    await page.click("xpath=//div[@title='New']");
}

const recordTypeSelection = async function(page,recordType){
    await page.click("xpath=//div[@class='changeRecordTypeOptionRightColumn']//span[normalize-space()='"+recordType+"']");
    await page.click("xpath=//span[normalize-space()='Next']");
}

const textInput = async function(page,label,value){
        await page.fill("//label[text()='"+label+"']/..//input",value);
}

const textAreaInput = async function(page,label,value){
    await page.fill("//label[text()='"+label+"']/..//textarea",value);
}

const lookUpAndPickListSelect = async function(page,label,value,isLookup){
    if(isLookup){
        await page.click("//label[text()='"+label+"']/..//input");
        await page.type("//label[text()='"+label+"']/..//input",value);
        await page.click("//label[text()='"+label+"']/..//lightning-base-combobox-formatted-text[@title='"+value+"']");    
    }else{
        await page.click("//label[text()='"+label+"']/..//lightning-base-combobox");
        await page.click("//label[text()='"+label+"']/..//lightning-base-combobox-item[@data-value='"+value+"']");

    }
}

const assignValueToField = async function(page,label,value,type){
        if(type == 'picklist'){
                await lookUpAndPickListSelect(page,label,value,false);
        }
        else if(type == 'reference'){
                await lookUpAndPickListSelect(page,label,value,true);
        }
        else if(type == 'textarea'){
            await textAreaInput(page,label,value);
            
        }else{
                await textInput(page,label,value.toString());
        }
}
const save = async function(page){
    await page.click("//button[@name='SaveEdit']");
    await page.click("xpath=//button[@title='Close']//lightning-primitive-icon");
}




module.exports = {
    login,
    gotoTab,
    newButtonClick,
    recordTypeSelection,
    assignValueToField,
    textInput,
    lookUpAndPickListSelect,
    save
}
