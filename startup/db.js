const mongoos = require ('mongoose');
const config = require('config');

function connectDB(){
    mongoos.connect(
        config.get('mongoURI'),
        {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to MongoDB...'))
        .catch((err) => {
            console.log(`Could not connect to MongoDB. Error: ${err}`);
            process.exit(1);
        
        });
}

module.exports = connectDB;
