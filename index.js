const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')
const display=document.querySelector('.calculator_display')
keys.addEventListener('click',function (e){
    if(e.target.matches('button')){
    const key=e.target;
    //lấy dữ liệu data-action
    const action=key.dataset.action;
    const keyContent=key.textContent;
    const displayedNum=display.textContent;
    const previousKeyType=calculator.dataset.previousKeyType;
    //Xóa .is-depressed
    Array.from(key.parentNode.children).forEach(k=>k.classList.remove('is-depressed'));
    if(!action){
       if(displayedNum==='0'||previousKeyType==='operator'||previousKeyType==='calculate'){
           display.textContent=keyContent;
       }else{
           display.textContent=displayedNum+keyContent;
       }
       calculator.dataset.previousKeyType='number';
    }else{
        if(action==='decimal'){
            console.log('decimal');
            if(!displayedNum.includes('.')){
                display.textContent=displayedNum + '.';
            }else if(previousKeyType==='operator'||previousKeyType==='calculate'){
                display.textContent='0.';
            }
            console.log(previousKeyType.dataset);
            calculator.dataset.previousKeyType='decimal';
            
        }
        if(action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent='CE';
        }
        if(action === 'clear'){
            console.log('clear');
            if(key.textContent==='AC'){
                calculator.dataset.firstValues='';
                calculator.dataset.modValue='';
                calculator.dataset.operator='';
                calculator.dataset.previousKeyType='';
            }else{
                key.textContent='AC'
            }
            display.textContent=0;
            calculator.dataset.previousKeyType='clear';
        }
        if(action==='calculate'){
            console.log('calculate');
            let firstValues=calculator.dataset.firstValues;
            let operator=calculator.dataset.operator;
            let secondValue=displayedNum;
            if(firstValues){
                if(previousKeyType==='calculate'){
                    console.log(displayedNum);
                    firstValues = displayedNum;
                    secondValue=calculator.dataset.modValue;
                }
                display.textContent=calculate(firstValues,operator,secondValue);
            }
            calculator.dataset.modValue=secondValue;
            calculator.dataset.previousKeyType='calculate';
        }
        if(action=='add'||action=='sub'||action=='mutiply'||action=='divide'){
            let firstValues=calculator.dataset.firstValues;
            let operator=calculator.dataset.operator;
            let secondValue=displayedNum;
            if(firstValues && operator && previousKeyType !== 'operator'&& previousKeyType !== 'calculate'){
                const calculaeValue=calculate(firstValues,operator,secondValue);
                display.textContent=calculaeValue;
                //update firstValue
                calculator.dataset.firstValues=calculaeValue;
            }else{
                calculator.dataset.firstValues=displayedNum;
            }
            key.classList.add('is-depressed');
            //Thêm custom attribute
            calculator.dataset.previousKeyType='operator';
            calculator.dataset.operator=action;
        }
    }
    }
})
function calculate(n1,operator,n2){
    if(operator==='add'){
        return parseFloat(n1)+parseFloat(n2);
    }
    if(operator==='sub'){
        return parseFloat(n1)-parseFloat(n2);
    }
    if(operator==='mutiply'){
        return parseFloat(n1)*parseFloat(n2);
    }
    if(operator==='divide'){
        return parseFloat(n1)/parseFloat(n2);
    }
}