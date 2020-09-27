/* Creating the buttons */
var res = document.createElement('div');
var buttonsCont = document.createElement('div');
var ids = ['btn0', 'btn1', 'btnClr', 'btnEql', 'btnSum', 'btnSub', 'btnMul', 'btnDiv'];
var innerHtmls = ['0', '1', 'C', '=', '+', '-', '*', '/'];
var styles = ['binaryButton', 'binaryButton', 'utilityButton', 'utilityButton', 'operatorButton', 'operatorButton', 'operatorButton', 'operatorButton'];
display();
container();
attachInterface();

/*Calculator*/
var operator='';
var operator2='';
function buttonClick(e) {
    var button = e.target || e.srcElement;
    
    /*button= "Clr"*/
    if (button.id == 'btnClr') {
        operator = '';
        res.innerHTML = '';
    }
    
    /*button!="Clr"&!= "="*/
    else if (button.id != 'btnEql') {
        
        /*button="btnOperator"*/
        if (button.id != 'btn0' && button.id != 'btn1') {
        /*Operator was clicked before, calculate to maintain the order of operations*/
            if (operator != '') {
                if(button.id=='btnMul'|button.id=='btnDiv'){
                    if(operator2==''){
                        operator2=button.innerHTML;
                    }
                    else
                        calculateFirst();
                }
                else if(operator2!=''){
                    calculateFirst();
                }
                else{
                    calculate();
                }
            }
            if(operator2=='')
             operator = button.innerHTML;
        }

        /* Append the rest to res*/
        res.innerHTML += button.innerHTML;
    }
    
    /*button.id="btnEql"*/
    else if(operator2==''){
        calculate();
    }
    else{
        calculateFirst();
        calculate();
    }
}
/* 
*   Calculating based on Operator
*/
function calculate(){

    var actions = res.innerHTML.split(operator);
    let ans=eval(parseInt(actions[0], 2)+operator+parseInt(actions[1], 2));
    res.innerHTML = Math.floor(ans).toString(2);
    ans=res.innerHTML;
    operator='';
}
/**
 * Calculating by Mathmatical order in case we have Multy\Div and another operator based on Operator2
 */
function calculateFirst(){
    let tmp=res.innerHTML.split(operator);
    let actions=tmp[1].split(operator2);
    let ans=eval(parseInt(actions[0], 2)+operator2+parseInt(actions[1], 2));
    res.innerHTML = tmp[0]+operator+Math.floor(ans).toString(2);
    operator2='';
}
/**
 * Attaching each element to his place
 */
function attachInterface(){
    for (var i = 0; i < ids.length; i++) {
        var button = document.createElement('button');
        button.innerHTML = innerHtmls[i];
        button.id = ids[i];
        button.className = 'button ' + styles[i];
        button.addEventListener('click', buttonClick);
        buttonsCont.appendChild(button);
    }
}
/**
 * Creating the container and the dispaly tab
 */
function container(){
    buttonsCont.id = 'btns';
    document.body.appendChild(buttonsCont);
}
/**
 * Creating the display tab
 */
function display(){
    res.id = 'res';
    res.addEventListener('click', buttonClick);
    document.body.appendChild(res);
}