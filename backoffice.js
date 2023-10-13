
const key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MTQ4ZjEzOWM0MzAwMTg4MTQ2NzYiLCJpYXQiOjE2OTcxOTEwNTUsImV4cCI6MTY5ODQwMDY1NX0.5ofF6k3Ne7gVlLnGPqslzFGDc3_supg335_qZCq_AEE'
const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get('eventId')
console.log(eventId)
const myform = document.getElementById('form')



if (eventId) {
    // Nel Caso si dovesse mod
    fetch('https://striveschool-api.herokuapp.com/api/agenda/' + eventId)
      .then((res) => {
        if (res.ok) {
            return res.json()
           } else {
             throw new Error('ERRORE NEL RECUPERO DETTAGLIO')
           }
         })
         .then((eventDetails) => {
             const nameInput = document.getElementById('name')
             const descriptionInput = document.getElementById('description')
             const brandInput= document.getElementById('brand')
             const imgInput = document.getElementById('imageUrl')
             const priceInput = document.getElementById('price')
        
             nameInput.value = eventDetails.name
             descriptionInput.value = eventDetails.description
             brandInput.value = eventDetails.brand
             imgInput.value = eventDetails.imageUrl
             priceInput.value = eventDetails.price
           })
           .catch((err) => {
             console.log('errore', err)
           })
       }


       
           
          


const formReference = document.getElementById('form')
formReference.addEventListener('submit', function (e) {
  e.preventDefault() 
  console.log("invio i dati all'API")

  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const brandInput= document.getElementById('brand')
  const imgInput = document.getElementById('imageUrl')
  const priceInput = document.getElementById('price')

 const newEvent = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imgInput.value,
    price: priceInput.value,
   
  }


  let methodToUse = 'POST'
  if (eventId) {
    methodToUse = 'PUT'
  }

  let urlToUse = 'https://striveschool-api.herokuapp.com/api/product/'
  if (eventId) {
    urlToUse = 'https://striveschool-api.herokuapp.com/api/product/' + eventId
  }

  fetch( urlToUse, {
 method: methodToUse,
 body: JSON.stringify(newEvent),
 headers: {
    "Authorization": key,
    'Content-Type': 'application/json',
 },
})
    .then((res) => {
        if(res.ok){
            alert ('GIOCO SALVATO!')
        } else {
            alter("ERRORE NEL SALVATAGGIO/MODIFICA")
            throw new Error('ERRORE NEL /PUT/POST')
        }
    })
    .catch((err) => {
        console.log('si è verificato un errore:', err)
    })
   
    .then(() => {
        myform.reset()
    })
    
    

    
    
})



