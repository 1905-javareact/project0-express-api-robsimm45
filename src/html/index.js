function login(event){
    event.preventDefault()
    console.log('trying to login')
    const username = document.getElementById('inputUsername').value
    const password = document.getElementById('inputPassword').value

    const credentials = {
        username,
        password
    }

    try{
        const response = await fetch( 'http://localhost:9050/users/login',{
            method:'POST',
            credentials: 'include',
            body: JSON.stringify(credentials),
            headers:{
                'content-type': 'application/json'
            }
        })


        console.log(response)

        if(response.status === 401){
            document.getElementById('error-message').innerText
        } else if(response.status === 200){

        }else{
            
        }


    }catch(err){

    }
}