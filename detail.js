const key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MTQ4ZjEzOWM0MzAwMTg4MTQ2NzYiLCJpYXQiOjE2OTcxOTEwNTUsImV4cCI6MTY5ODQwMDY1NX0.5ofF6k3Ne7gVlLnGPqslzFGDc3_supg335_qZCq_AEE'
const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get('eventId')
console.log(eventId)

const deleteEvent = function () {
 
  fetch('https://striveschool-api.herokuapp.com/api/product/' + eventId, {
    method: 'DELETE',
    headers:{
        "Authorization": key,
     
      }
  })
    .then((res) => {
      if (res.ok) {
          alert('GIOCO ELIMINATO')
          location.assign('./index.html') 
        } else {
          alert("Problema con l'eliminazione del gioco")
          throw new Error('Errore nella DELETE')
        }
      })
      .catch((err) => {
        console.log('ERRORE!', err)
      })
  }
      

const generateEventDetails = function (details) {
  // prendo un riferimento alla row
  const row = document.getElementById('event-details')
  row.innerHTML = `
        <div class="col col-12 col-lg-6">
            
            <img
              src="${details.imageUrl}"
              class="w-100"
              alt="game picture"
            />
            <h3 class="text-center mt-4">${details.name}</h3>
            <p>
              ${details.description}
            </p>
            <p>Prezzo: ${details.price}€</p>
            <button class="btn btn-danger" onclick="deleteEvent()">ELIMINA</button>
            <a class="btn btn-warning" href="./backoffice.html?eventId=${
              details._id
            }">MODIFICA</a>
        </div>
    `
}

const getSingleEventDetails = function () {
  fetch('https://striveschool-api.herokuapp.com/api/product/' + eventId,{
    headers:{
        "Authorization": key,
     }
 })
   .then((res) => {
      if (res.ok) {
       
        return res.json()
      } else {
        throw new Error('Errore nel caricamento dei dettagli')
      }
    })
    .then((eventData) => {
        generateEventDetails(eventData)
      })
      .catch((err) => console.log('ERRORE', err))
  }
  
  getSingleEventDetails()
      
