const BASE_URL="https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

// for (code in countryList){
//     console.log(code);
// }


for (let select of dropdowns){
    for (let currcode in countryList){
        let newoption= document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name=="from" && currcode=="USD"){
            newoption.selected="selected";
        }else if(select.name=="to" && currcode=="INR"){
            newoption.selected="selected";

        }
        select.appendChild(newoption);

    }

    select.addEventListener("change", (e)=>{
        updateflag(e.target);
    });
}


const updateflag =(element)=>{
    let code=element.value;
    let countrycde=countryList[code];
    let newSrc=`https://flagsapi.com/${countrycde}/flat/64.png`;
    // Traverse DOM: find img tag near this select
    const container = element.closest("div"); // div directly wrapping select
    const img = container?.previousElementSibling?.tagName === "IMG"
        ? container.previousElementSibling
        : container.parentElement.querySelector("img");

    if (img) {
        img.src = newSrc;
    } else {
        console.warn("Flag image not found for", code);
    }

};

btn.addEventListener("click", async(e)=>{
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value=1;
    }
// console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}${fromCurr.value}`;
    try {
        const response = await fetch(URL);
        const data = await response.json();

        const rate = data.rates[toCurr.value];
        const finalAmount = (amtval * rate).toFixed(2);

        const msgDiv = document.querySelector(".msg");
        msgDiv.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        alert("Failed to fetch exchange rate. Try again later.");
    }

});