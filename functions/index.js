const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("//Your Firebase Admin SDK Key"); //Make sure you have to import you API key into functions folder
  admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testid.firebaseio.com" //database URL make with your project ID
});

const db = admin.firestore();

// create
app.post('/create', (req, res) => {
(async () => {
        try {
            await db.collection('details').doc('/' + req.body.id + '/').create({name: req.body.name});
            return res.status(200).send("Data Successfully Inserted");
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
  
// read
app.get('/read/:itemid', (req, res) => {
(async () => {
        try {
            let item = await db.collection('details').doc(req.params.itemid).get();
            let response = item.data();
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
  
// update
app.put('/update/:itemid', (req, res) => {
(async () => {
    try {
        const document = db.collection('details').doc(req.params.itemid);
        await document.update({
            name: req.body.name,
        });
        return res.status(200).send("Data Successfully Updated");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});
  
// delete
app.delete('/delete/:itemid', (req, res) => {
(async () => {
    try {
        const document = db.collection('details').doc(req.params.itemid);
        await document.delete();
        return res.status(200).send("Data Successfully Deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

exports.app = functions.https.onRequest(app);