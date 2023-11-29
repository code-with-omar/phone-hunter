const phoneHounter = (phone) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
        .then(response => response.json())
        .then(data => phonesAll(data.data));
}

const phonesAll = (phones) => {
    const mainContainer = document.getElementById('main-contianer');
    mainContainer.innerText = "";
    for (const phone of phones) {
        // console.log(phone)

        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top p-5 img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Phone Name: ${phone.phone_name} </h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <p class="card-text">slug: ${phone.slug}</p>
                    <button onclick="showDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mobileDetailsShow">Show Details</button>
                    
                </div>
            </div>
        `
        mainContainer.appendChild(div);
    }
    //stop loader
    isloader(false)
}

// Search Phone. When button is click then loader wll be start
document.getElementById('searchPhone').addEventListener('click', () => {
    //finde loader id

    isloader(true);
    const textField = document.getElementById('textField');
    const textValue = textField.value;
    phoneHounter(textValue);
})
const isloader = (toggle) => {
    const loader = document.getElementById('loader')
    if (toggle) {
        loader.classList.remove("d-none");
    }
    else {
        loader.classList.add("d-none");
    }
}

// phone details 
const showDetails = (details) => {
    // console.log(details)
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
        .then(response => response.json())
        .then(data => showPhoneDetails(data.data));
}

const showPhoneDetails = (data) => {

    const mobileShow = document.getElementById('display-mobile-details');
    mobileShow.innerHTML = ''
    const div = document.createElement('div');
    div.classList.add("modal-dialog");
    div.innerHTML = `
        <div class="modal-content">
         
            <div class="modal-body">
               
                <img src="${data.image}" alt="" class="p-5 pt-1 img-fluid text-center">

                <h1 class="modal-title fs-5" id="mobileDetailsShowLabel">${data.name}</h1>
                <p>Storage:${data.mainFeatures.storage}</p>
                <p>Display Size: ${data.mainFeatures.displaySize}</p>
                <p>Chipest: ${data.mainFeatures.chipSet}</p>
                <p>Memory: ${data.mainFeatures.memory}</p>
                <p>Slug: ${data.slug}</p>
                <p>Relase Date: ${data.releaseDate ? data.releaseDate : 'Donot find relase date'}</p>
                <p>Brand: ${data.brand}</p>
             
                <button type="button" class="btn btn-danger ms-0" data-bs-dismiss="modal">Close</button>
                
            </div>
            
        </div> 
    `
    mobileShow.appendChild(div)
    console.log(data.mainFeatures
    );
}
phoneHounter('iphone')