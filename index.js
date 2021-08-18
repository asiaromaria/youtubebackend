const mongoos = require('mongoose');


mongoos
    .connect('mongodb+srv://mongodb+srv://new-user-01:YSx371pVxKIbHNnb@cluster0.2jmzi.mongodb.net/deck_of_cards?retryWrites=true&w=majority'
    {useNewUrlParser: true, useUnifiedTopology: true}
    .then(()=> console.log('Connected to MongoDB...')
    .catch((err)=> console.log(`Could not connect to MongoDB. ERROR: ${err}`));


    