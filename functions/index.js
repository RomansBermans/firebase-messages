/* */


const Firebase = require('firebase-admin');
const Functions = require('firebase-functions');


/* ********* INIT ********* */


const timestamp = Firebase.database.ServerValue.TIMESTAMP;


/* ********* FUNCTIONS ********* */


module.exports = {
  emoji: Functions.https.onRequest((req, res) =>
    res.send(['😀', '😇', '😍', '😤', '😳', '😵'][Math.floor(Math.random() * 6)]),
  ),

  emojify: Functions.database.ref('/messages/{message}/text').onCreate(event => {
    let text = event.data.val();

    text = text.replace(/8\)/gi, '😎');
    text = text.replace(/:\)|:D/gi, '😁');
    text = text.replace(/:\(/gi, '🙁');
    text = text.replace(/<3/gi, '❤️');

    return event.data.ref.parent.update({ modified: timestamp, text });
  }),
};
