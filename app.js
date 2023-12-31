const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropDowns=document.querySelectorAll(".dropdown select");
let btn= document.querySelector("button");


const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select")
const msg = document.querySelector(".msg");

for(let select of dropDowns){
    
    for (const currCode in countryList){
        
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if (select.name === "from"&& currCode=== "USD") {
            newOption.selected="selected";
        } else if (select.name === "to"&& currCode=== "BDT") {
            newOption.selected="selected";
        }};
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target)
            
        })
}
const updateFlag=(element)=>{

 let currCode=element.value;
 let countryCode=countryList[currCode];
 let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
 let image=element.parentElement.querySelector("img");
 image.src=newSrc;
 
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    console.log(amtVal)
    if(amtVal=== ""|| amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data= await response.json();
    let rate= data[toCurr.value.toLowerCase()]
    let finalAmt=rate*amount.value;
    msg.innerText=` ${amtVal } ${ fromCurr.value }=${ finalAmt} ${ toCurr.value}`
   
});
