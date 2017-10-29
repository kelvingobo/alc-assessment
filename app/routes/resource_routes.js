const admin = require('firebase-admin');
var serviceAccount = require('../../config/alc-intermediate-assessment-firebase-adminsdk-d65tp-47a6a6f49b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alc-intermediate-assessment.firebaseio.com"
});

module.exports = function(app) {
  app.post('/create-student', (req, res) => {
    admin.auth().createUser({
      uid: "some-uid",
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password
    })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
      })
      .catch(function(error) {
        console.log("Error creating new user:", error);
      });
  });
  // get list of all users
  app.get('/list-users', (req, res) => {
      admin.auth().listUsers(1000)
      .then((listUsersResult) => {
        res.send(listUsersResult.users);
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
  });
  // delete a student
  app.post('/delete-student', (req, res) =>{
    let id = req.body.uid;
    admin.auth().deleteUser(id)
      .then(function() {
        console.log("Successfully deleted user");
      })
      .catch(function(error) {
        console.log("Error deleting user:", error);
      });
  });

};
