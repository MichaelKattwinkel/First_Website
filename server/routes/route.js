const ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
    // create
app.post('/verses', (req, res) => {  
    const verse = { 
        user: req.body.user, 
        book: req.body.book, 
        chapter: req.body.chapter, 
        start: req.body.start, 
        end: req.body.end, 
        text: req.body.text 
    };
    //make sure no fields are empty
    //res.headers.append('Access-Control-Allow-Origin', '*');
    //res.headers.append('Access-Control-Allow-Credentials', 'true');
    if(verse.user && verse.book && verse.chapter && verse.start && verse.end && verse.text){ 
        //adds to database
        db.collection('verses').insertOne(verse, (err, result) => {
        if (err){
            res.send({'error': 'An error has occured'});
        }
        else{
            res.send(result.ops[0]);
        }
    });
    
}
    else{
        res.send({'error': "Missing one or more feilds"})
    }
});
    //read
    app.get('/verses', (req, res) => {
        const username = req.headers.user;
        console.log(username);
        const query = { user: username}
        //console.log(query);
        db.collection('verses').find(query).toArray( (err, items) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else{
                res.send(items);
            }
        });
        })
    
    //delete
    app.delete('/verses/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id : new ObjectID(id) };
        db.collection('verses').deleteMany(query, (err, item) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send('Verse id: '+ id + ' deleted!');
            }
        })
        
    })
}

