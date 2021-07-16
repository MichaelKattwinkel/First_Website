function getData(url = 'http://localhost:7000/verses', username) {
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'user': 'user1'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
    .catch(err => { console.log(err) });
}

export default getData;