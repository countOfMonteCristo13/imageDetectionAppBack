// import express from 'express';
import express, { json } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
const app = express();
import knex from 'knex';

import { handleRegister } from './controllers/register.js';
import { handleSignIn } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleImage } from './controllers/image.js';

// host 127.0.0.1 je isto sto i localhost
//user OWNER U BAZI PODATAKA

const db = knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'test',
		database: 'smart-brain'
	}

});


// postgres.select('*').from('users');  ovo vraca PROMISE!!!

db.select('*').from('users')
	.then(data =>{
		// console.log(data);
	});

app.use(json());
app.use(cors());

// const database = { //koristimo ovako jer trenutno ne radimo za bazom podataka
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			email: 'john@gmail.com',
// 			password: 'cookies',
// 			entries: 0, //BROJ KOLIKO PUTA JE UNEO SLIKU NA DETEKCIJU!
// 			joined: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'Sally',
// 			email: 'sally@gmail.com',
// 			password: 'bananas',
// 			entries: 0, //BROJ KOLIKO PUTA JE UNEO SLIKU NA DETEKCIJU!
// 			joined: new Date()
// 		}
// 	]
// }// NE KORISTIM VISE OVAKO ZBOG SIGURNOSTI I SIFRE JER SIFRA NE TREBA NIKADA DA BUDE CIST TEKST!!!!


//root
app.get('/',(req,res) =>{
	res.send('lets gooo!!!');
})

//signin

app.post('/signin',(req,res) =>{handleSignIn(req,res,db,bcrypt)})

//register

app.post('/register',(req,res) => {handleRegister(req,res,db,bcrypt)}); // nalazi se u controller/register.js

//profile/:userId

app.get('/profile/:id',(req,res) =>{handleProfileGet(req,res,db)});

// image

app.put('/image',(req,res) => {handleImage(req,res,db)});

// BCRYPT NODEJS ENKRIPCIJA PASSWORDA!!!



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });




// const PORT = process.env.PORT;


app.listen(3001,() =>{ //3001 je port
	console.log(`app is running on port on 3001`);
})

// console.log(PORT);

/* DIZAJN API-JA


/ ROOT ROUTE --> res = this is working!
/signin - SIGNIN ROUTE --> POST = success/fail  odgovor ce biti ili uspesan ili greska!
/register - REGISTER ROUTE --> POST = user OBJECT
/profile/:userId - PROFILE --> GET = user OBJECT
/image --> PUT --> user OBJECT

POSTOJI MOGUCNOST DA SE OVAJ DIZAJN PROMENI TOKOM RADA ALI UGLAVNOM SVAKI OD OVIH ENDPOINTA
SE NAPRAVI I TESTIRA U ENDPOINTU-U, KAKO BI SE POBRINULI DA FUNKCIONISE!


*/