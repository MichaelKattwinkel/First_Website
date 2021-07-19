
async function deleteVerse(url = 'http://localhost:7000/verses', verseId){
    const url2 = url + "/" + verseId;
    const response = await fetch(url2, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
}

export default deleteVerse;