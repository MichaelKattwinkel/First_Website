async function getData(url = 'http://localhost:7000/verses', username) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'user': username
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        })
    .then(response => response.json())
    .catch(err => { console.log(err) });
    return(response); 
    }

export default getData;