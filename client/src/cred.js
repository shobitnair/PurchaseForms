//export const URL = 'http://65.0.124.177';

export const URL = process.env.NODE_ENV === 'production'
    ?'/api'
    :'http://localhost:8000/api'
      