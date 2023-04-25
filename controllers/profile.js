const handleProfileGet = (req,res,db) =>{
	const {id} = req.params; //params je ono sto ukucamo u url-u umesto :id recimo profile/123
	// database.users.forEach(user =>{
	// 	if (user.id === id) {
	// 		found = true;
	// 		return res.json(user);
	// 	}
		
		
		
	// })

	db.select('*').from('users').where({
		id: id
	})
	.then(user =>{
		if(user.length){
			res.json(user[0]);
		}else{
			res.status(400).json('not found');
		}
		
	})
	.catch(err =>{
		res.status(400).json('error getting user');
	})

	// if(!found){
	// 	res.status(404).json('no such user!');
	// }

}

module.exports = {
	handleProfileGet
}