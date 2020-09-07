const documentForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

documentForm.addEventListener('submit',(e) => {
    e.preventDefault()

    message1.textContent = "Loading...";
    message2.textContent = "";

    const location = search.value
    if(!location){
        message1.textContent= "Enter a value to search.";
        //console.log('Enter a value')
    } else {
        fetch("http://localhost:3000/weather?address="+location).then((response) => {
                response.json().then((data) =>{
                if(data.error){
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.location
                    message2.textContent = data.forecast
                }
            });
        })
        console.log(location)
    }
})