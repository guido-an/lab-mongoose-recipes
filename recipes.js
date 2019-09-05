const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    // mongoose.connection.db.dropCollection('recipes').then(documents => console.log('deleted'))
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  
  const recipeSchema = new Schema ({
    title: { type: String, required: true, unique: true },
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: Array,
    cuisine: { type: String, required: true },
    dishType: { type: String, enum: [ 'Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min: 0 },
    creator: String,
    created: { type: Date, default: new Date() }
  })


  const Recipe = mongoose.model('recipe', recipeSchema)

  
  const bestPizzaEver = new Recipe({
    title: 'Pineapple Pizza',
    level: 'Easy Peasy',
    ingredients: [ 'dough', 'pineapple', 'tomato sauce', 'ham', 'mozzarella cheese'],
    cuisine: 'italo-american',
    dishType: 'Snack',
    image: 'https://d2gk7xgygi98cy.cloudfront.net/1374-3-large.jpg',
    duration: '1',
    creator: 'Genius' 
  })

  bestPizzaEver.save(err => {
    console.log(err)
  })

  Recipe.insertMany(data).then(documents => {
    
    console.log(documents)
  })
  .catch(err => console.log(err))
  

  Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(console.log('well done!'))
  .catch(console.log('something went wrong'));


Recipe.deleteOne({ title: "Carrot Cake"})
  .then(() => console.log("document deleted"))
  // .catch(err => console.log(err))
  .then(() => {
    return mongoose.connection.close()
  })

  .catch(err => console.log('err' + err))

  
