const AWS = 'http://65.0.131.63/api'
const AZURE = 'http://pf-iitrpr.eastasia.cloudapp.azure.com/api'
const local = 'http://localhost:8000/api'

const req = (window.location.href)
//console.log('server => ' , (req.includes('localhost'))?local:AZURE)

export const URL = (req.includes('localhost'))?local:AZURE