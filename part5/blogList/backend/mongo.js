const mongoose = require('mongoose')

// logger.info('connecting to', config.MONGODB_URI)

mongoose.connect("mongodb+srv://fullstack:idontknow@cluster0.k3bva.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


  
  mongoose.connection.close()
