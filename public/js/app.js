//const { response } = require("express")

console.log("Server side java script loaded!")



const windowsform = document.querySelector('form')
const locationinput= document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')

windowsform.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = locationinput.value

    messageone.textContent='Loading...'
    messagetwo.textContent=''

    fetch('/weather?address=' + location + "'").then((response) => {
    response.json().then ((data) => {
        if (data.error) {
            messageone.textContent=data.error
        } else {
            console.log(data)
            messageone.textContent=data.weather
            messagetwo.textContent='Temperature: ' + data.temperature + '\n' + ', Feels Like: ' + data.feelslike
        }         
        
    })
})
})