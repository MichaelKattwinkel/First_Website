async function postData(url ='', Verse = {}, username) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: `user=${username}&book=${Verse.book}&chapter=${Verse.chapter}&start=${Verse.start}&end=${Verse.end}&text=${Verse.text}`
    });
}

const post = (username, Verse) => {
    postData('http://localhost:7000/verses', Verse, username)
}
export default post;