async function getData (value) {
    
    let fetchApi = await fetch(`http://api.exchangeratesapi.io/v1/${value}?access_key=760b5f60702c73714c5ed590ceaa403b`);
    let response = await fetchApi.json(); 
    
    return  response
};

document.querySelector('.open-modal').addEventListener('click', setListCurrencies)

async function setListCurrencies (){
    let data = await getData('symbols');
    const listOfCurrencies = document.querySelector('.currencies-list');

    Object.keys(data.symbols).forEach(currency =>
        
         listOfCurrencies.insertAdjacentHTML('beforeend',`
            <li id=${currency}>
            <img src=Assets/flags/${currency}.png>
            <span>${currency}</span>
            <span>${data.symbols[currency]}</span>
            </li>
        
        `)
        )

    //console.log();

}

document.querySelector('.open-modal').addEventListener('click', ()=>{
    document.querySelector('.modal-container').style.display = "flex"
})