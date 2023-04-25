const handleRegister = (req,res,db,bcrypt) =>{
	const{email,name,password} = req.body;

	if (!email || !name || !password) {// ako je neki od parametara prazan!
		return res.status(400).json('incorrect form submission');
	} 

	// bcrypt.hash(password, null, null, function(err, hash) { //BACON ZAMENJUJEMO SA PASSWORDOM!
    // // Store hash in your password DB.
	// 	console.log(hash);
	// }); asinhrono radi

	//sledece je sinhroni rad!

	const hash = bcrypt.hashSync(password);
	db.transaction(trx =>{ // transakcija! U ovom code bloku trx predstavlja bazu pa se zato koristi trx umesto db
		trx.insert({
			hash: hash,
			email:email
		}).into('login').returning('email').then(loginEmail =>{
			return trx('users')
				.returning('*')
				.insert({
					email:loginEmail[0].email,
					name:name,
					joined: new Date()
				})
				.then(user =>{
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register!'))

	// database.users.push({
	// 		id: '125',
	// 		name: name,
	// 		email: email,
	// 		entries: 0, //BROJ KOLIKO PUTA JE UNEO SLIKU NA DETEKCIJU!
	// 		joined: new Date()
	// })
	
}


module.exports = {
	handleRegister: handleRegister
};