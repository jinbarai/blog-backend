const mongoose = require('mongoose')
const mongooseValidator = require('mongoose-unique-validator')

const userScehma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userScehma.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
    delete returnedObject.passwordHash
  }
})


userScehma.plugin(mongooseValidator)

const User = mongoose.model('User', userScehma)

module.exports = User
