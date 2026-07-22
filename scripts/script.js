json_information = null

// decryption function
function decrypt(plaintext)
{
    ciphertext = ""

    for(idx in plaintext)
    {
        ciphertext += String.fromCharCode((plaintext.charCodeAt(idx))^(idx%6+2))
    }

    return ciphertext
}

// on load
window.addEventListener('load', onLoad)
function onLoad()
{    
    button = document.getElementById("submit_button")
    input = document.getElementById("input_text")

    text = document.getElementById("text")
    
    apiCall()

    button.addEventListener("click", function ()
    {
        document.getElementById("text").innerHTML = document.getElementById("input_text").value + " ..."
    })

    input.addEventListener("focus", function()
    {
        if(input.value == "Enter Lichess username")
        {
            input.value = ""
            input.style.color = "var(--ruby)"
        }
    })

    input.addEventListener("focusout", function()
    {
        if(input.value == "")
        {
            input.value = "Enter Lichess username"
            input.style.color = "var(--slate)"
        }
    })
}

// call api
async function apiCall()
{
    const chip1 = "njtZSkJgp23li7=LPO3S1vvJ"

    const response = await fetch('https://lichess.org/api/user/theabidaly0?trophies=false&profile=true&rank=false&fideId=false', {
        headers: {
            Authorization: `Bearer ${decrypt(chip1)}`
        }
    })
    
    const text = await response.text();

    json_information = JSON.parse(text)
}