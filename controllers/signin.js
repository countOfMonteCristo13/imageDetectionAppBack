const handleSignIn = (req,res,db,bcrypt) =>{

	const{email,password} = req.body;

	if (!email || !password) {// ako je neki od parametara prazan!
		return res.status(400).json('incorrect form submission');
	} 


	db.select('email','hash').from('login')
		.where('email','=', email)
		.then(data =>{
			const isValid = bcrypt.compareSync(password,data[0].hash);
			if(isValid){
				return db.select('*').from('users').where('email','=',email)
				.then(user =>{
					res.json(user[0]);
				})
				.catch(err => {
					res.status(400).json('unable to get user!');
				})
			}else{
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err =>{
			res.status(400).json('wrong email/password combination!');
		})



	// // res.send('signing!');
	// 	// res.json('signing!');

	// if(req.body.email === database.users[0].email
	// 	&& req.body.password === database.users[0].password){
	// 	res.json(database.users[0]);
	// }else{
	// 	res.status(400).json('error logging in!');
	// }
}

module.exports = {
	handleSignIn: handleSignIn
};


// OVDE SMO PREBACILI KAKO BI IZ GLAVNOG JS FAJLA MOGAO DA POZIVAS TO 
// LEPO IZGLEDA ONDA 
// MALI JE FAJL