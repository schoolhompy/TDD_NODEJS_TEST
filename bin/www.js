const app = require('../index');
const syncDb = require('./sync-db');

syncDb().then(_=>{
    
    app.listen(3999, function(){
        console.log('server')
    })
})