import { Router } from 'express';
import  firebase from 'firebase';

const userRouter = new Router();
let loginUser = '';

userRouter.post('/signup', (req, res) => {
	firebase.auth().createUserWithEmailAndPassword(req.body.account, req.body.pwd)
  .then(()=>{
    loginUser = firebase.auth().currentUser.uid;
    let loginUserRef = firebase.database().ref('users/' + loginUser);
    loginUserRef.set({
      name: req.body.name,
      img : req.body.img,
      bluetooth : req.body.bluetooth,
      created_at : firebase.database.ServerValue.TIMESTAMP
    }).catch((error) =>{
    });
  })
  .catch((error) =>{
	});
});


userRouter.post('/login', (req, res) => {
  	firebase.auth().signInWithEmailAndPassword(req.body.account, req.body.pwd)
  	.then(() => {
    	loginUser = firebase.auth().currentUser.uid;
      return res.send(JSON.stringify(uid:loginUser));
  	})
  	.catch((error) => {
  		return 'error';
  	});
})

userRouter.get('/login', (req, res) => {
	return res.send(JSON.stringify(loginUser));
})

userRouter.post('/logout', (req, res) => {
	if (req.body.logout === true){
	  	firebase.auth().signOut().then(() => {
    	loginUser = '';
  	})
  	.catch((error) => {
  		loginUser = '';
  	});
}})


export default userRouter;