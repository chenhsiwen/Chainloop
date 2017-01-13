import { Router } from 'express';
import  firebase from 'firebase';


const productRouter = new Router();
productRouter.get('/', (req, res) => {
	let productsRef = firebase.database().ref("products");
	productsRef.once('value').then((snapshot) =>{
 		res.send(JSON.stringify(snapshot.val()));
	});
});

productRouter.post('/', (req, res) => {
	let newproduct = req.body;
	newproduct.created_at = firebase.database.ServerValue.TIMESTAMP;
	let productsRef = firebase.database().ref('products');
    productsRef.push().set(newproduct)
	.catch(function(err){
		throw new Error('post fail');
  	})
});

productRouter.get('/:pid', (req, res) => {
	let productRef = firebase.database().ref("products/"+ req.params.pid);
	productRef.once('value').then((snapshot) =>{
 		res.send(JSON.stringify(snapshot.val()));
	});

});
productRouter.post('/:pid', (req, res) => {
	let neworder = req.body;
  	console.log(req.body);
  	let productRef = firebase.database().ref("products/"+ req.params.pid);
  	productRef.once('value').then((snapshot) =>{		
  		let updateproduct =snapshot.val();
  		updateproduct.numleft = neworder.numleft;
  		productRef.update(updateproduct);
	}).then(() =>{		
  		delete neworder["numleft"]; 
		neworder.created_at = firebase.database.ServerValue.TIMESTAMP;
		let ordersRef = firebase.database().ref('orders');
    	ordersRef.push().set(neworder)
		.catch(function(err){
			throw new Error('post fail');
  		})
	})
	.catch(function(err){
		throw new Error('order fail');
	})
});
	

export default productRouter;
