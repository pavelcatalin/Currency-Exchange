 async function getData (value) {
    
    let fetchApi = await fetch(`http://api.exchangeratesapi.io/v1/${value}?access_key=760b5f60702c73714c5ed590ceaa403b`);
    let response = await fetchApi.json(); 
   
    
    return response
};
//global variables

let listOfCurrencies = document.querySelector('.currencies-list');

//
let baseCurrencies = [];


let currenciesData = {
    
}



async function populateCurrencyList(){
    
    let abreviation = await getData("symbols")
    
    for(let prop in  abreviation.symbols){
       
        listOfCurrencies.insertAdjacentHTML('beforeend',
        `
        <li id=${prop}>
            <img src="Assets/flags/${prop}.png" >
            <span>${prop} </span><span>  - ${ abreviation.symbols[prop]}</span>
        </li>
        `
        )
    }
}

populateCurrencyList()


listOfCurrencies.addEventListener('click', selectedBaseCurrencies)

function selectedBaseCurrencies(e){
   let selectedCurrency = e.target.closest('li');
   let currencyAbreviation = selectedCurrency.getAttribute('id');
   
   if( !selectedCurrency.classList.contains('disabled')){
        selectedCurrency.classList.add('disabled')
        createCard(currencyAbreviation)
    }
}

function createCard(currencyAbreviation){
    let cardContainer = document.querySelector('.card-container');
    let amount = document.querySelector('#amount').value
    cardContainer.insertAdjacentHTML('beforeEnd',`
    
    <div class="card" id=${currencyAbreviation}>

                <div class="close-card">
                    <button class="close-card-btn">X</button>
                </div>

                <div class="flag-amount">
                    <img src="Assets/flags/${currencyAbreviation}.png" alt="">
                    <span class="symbol">&euro;</span>
                    <span class="amount">${amount}</span>
                </div>

                <div class="name-rate">
                    <p class="abreviation"><span>EUR</span>-<span>Euro</span></p>
                    <p class="rate"><span>EUR</span>=<span>EUR</span></p>
                </div>

            </div>
    
    `)
}

document.querySelector('.card-container').addEventListener('click', closeCard);

function closeCard(e){
    if(e.target.classList.contains('close-card-btn')){
       let parentelement = e.target.parentElement.parentElement;
       let parentElementId = parentelement.getAttribute('id')
       parentelement.style.display = "none";
        document.querySelector(`li#${parentElementId}`).classList.remove('disabled')
    }
}























let displayModal = () => document.querySelector('.modal-container').style.display = 'flex'  


document.querySelector('.open-modal').addEventListener('click', displayModal)

let closemodal = () => document.querySelector('.modal-container').style.display = 'none'

document.querySelector('.modal-container').addEventListener('click', (e)=>{
    let modal = document.querySelector('.modal-container')
    if(e.target == modal){
        closemodal()
    }
})