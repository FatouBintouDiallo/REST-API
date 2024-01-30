require ('dotenv').config
const express= require('express')
const app =express()
const mongoose= require('mongoose')

// définition du port
app.get('/',(req,res)=> {
    res.send('hello the express server is running.')
} )

class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(`mongodb://localhost:27017/Fatima`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
      }
    }
    const Userschema = new mongoose.Schema({
      Username:{
          type:String,
          require:true,
          unique:true
      },
      email:{
          type:String,
          require:true,
          unique:true
      },
      PassWord:{
          type:String,
          unique:true
      }
  })
  const User= mongoose.model('User',Userschema)
    const NewUser= new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
    });
    NewUser.save()
    .then((user) => {
      console.log('Utilisateur enregistré :', user);
    })
    .catch((error) => {
      console.error('Erreur lors de lenregistrement de utilisateur :', error);
    });
    // Dans le fichier server.js
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Dans le fichier server.js
app.post('/users', async (req, res) => {
  const { Username, email, password } = req.body;

  try {
    // Créez un nouvel utilisateur en utilisant le modèle User
    const newUser = new User({ 
      Username:'Lamine-SENE',
       email :'fatoudiallowx@exemple.com',
        password :'Fatima123'});

    // Enregistrez le nouvel utilisateur dans la base de données
    const savedUser = await newUser.save();

    // Répondez avec les détails de l'utilisateur nouvellement créé
    res.status(201).json(savedUser);
  } catch (error) {
    // En cas d'erreur, renvoyez un statut 400 (Mauvaise requête) avec le message d'erreur
    res.status(400).json({ message: error.message });
  }
});

// PUT: 
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
    app.listen(3000,()=> {
      console.log('the express server is running on port 3000')
   })
    module.exports=new Database