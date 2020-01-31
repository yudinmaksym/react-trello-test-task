import Dexie from 'dexie';

const db = new Dexie('myDb');
db.version(1).stores({
    columns: '++id,columnName,rows',
    cards: '++id,cardName,description,img,timeCreated,userWhoCreated,columnId',
    users: "++id, firstName, lastName, email, password"
});

db.open().catch(function (e) {
    console.err("Open failed: " + e);
});

export default db;