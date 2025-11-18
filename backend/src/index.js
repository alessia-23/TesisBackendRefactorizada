import connection from './core/database/database.js';
import app from './server.js'

connection()

app.listen(app.get('port'),()=>{
    console.log(`Server ok on http://localhost:${app.get('port')}`);
})