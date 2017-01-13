import { Router } from 'express';
import  firebase from 'firebase';


const orderRouter = new Router();
orderRouter.get('/:uid', (req, res) => {
	let oredersRef = firebase.database().ref("orders/");
	oredersRef.orderByChild("uid").equalTo(req.params.uid).once('value').then((snapshot) =>{
 		res.send(JSON.stringify(snapshot.val()));
	});
});

export default orderRouter;
