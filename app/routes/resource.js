const admin = require('firebase-admin');
var serviceAccount = require('../../config/alc-intermediate-assessment-firebase-adminsdk-d65tp-47a6a6f49b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://alc-intermediate-assessment.firebaseio.com'
});

var db = admin.database();
var ref = db.ref('student-resources');

module.exports = function(app) {
  // create a new student
  app.post('/create-student', (req, res) => {
    admin.auth().createUser({
      uid: Date.now(),
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password
    })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
      });
  });
  // update an existing student
  app.post('/update-student', (req, res) => {
    admin.auth().updateUser(req.body.uid, {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully updated user", userRecord.toJSON());
    })
    .catch((error) => {
      console.log("Error updating user:", error);
    });
  });

  // delete a student
  app.post('/delete-student', (req, res) =>{
    let id = req.body.uid;
    admin.auth().deleteUser(id)
      .then(() => {
        console.log('Successfully deleted user');
      })
      .catch((error) => {
        console.log('Error deleting user: ', error);
      });
  });
  // get list of all users
  app.get('/list-users', (req, res) => {
      admin.auth().listUsers(1000)
      .then((listUsersResult) => {
        res.send(listUsersResult.users);
      })
      .catch((error) => {
        console.log('Error listing users: ', error);
      });
  });
  // create a new student resource
  app.post('/create-new-resource', (req, res) => {
    ref.push({
      title: req.body.title,
      text: req.body.text,
    }).then(() => {
      console.log('New resource has been added Successfully');
    }).catch(() => {
      console.log('Adding new resource failed');
    });
  });
  // delete student resource
  app.post('/delete-resource', (req, res) => {
    ref.child(req.body.key).set({
      title: null,
      text: null,
    }).then(() => {
      console.log('New resource has been deleted Successfully');
      res.send('New resource has been deleted Successfully');
    }).catch(() => {
      console.log('deletion resource failed');
    });
  });
  // list all available resources
  app.get('/list-available-resources', (req, res) => {
    ref.once('value', (snapshot) => {
      let listOfAvailRes = [];
      snapshot.forEach((childSnapshot) => {
        listOfAvailRes.push({
          title: childSnapshot.val().title,
          text: childSnapshot.val().text,
          key: childSnapshot.key,
        });
      });
      res.send(listOfAvailRes);
    });
  });

};
