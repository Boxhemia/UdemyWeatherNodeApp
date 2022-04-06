console.log('fuck me in the ass i have become pajeet')

/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{

    response.json().then((data)=>{
        console.log(data)
    })

})*/



const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



message1.textContent = ''
message2.textContent = ''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchInput.value
    if(!location){
        message1.textContent = 'you need to write an address dumbass'
    }
    else{
        message1.textContent = 'loading'
        fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
        
            if (data.error){
                message1.textContent = 'something went wrong'
            } else{
                message1.textContent = (data.location)
                message2.textContent = (data.forecast)
                }
            })
        })
        }

    
})