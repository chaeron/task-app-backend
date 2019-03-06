const {User} = require('./../models');

// Connect to MongoDB
require('../utils/database');

async function clearDatabase(){
	try {
		console.log('Deleting users...');
		return await User.deleteMany({});
	} catch(error){
		console.log('Error deleting users');
		return false;
	}
}

async function addUsers(){

	const users = [
      {
        email: 'test@test.com',
        password: 'test',
		active: true
      }
    ];


	for( let user of users ){
		const newUser = await new User( user );
		//console.log('creating new user: ' + JSON.stringify(newUser) );
		try {
			newUser.save();
		} catch (err){
			console.log('Error saving User');
		}
		
	}

	return await User.find({});
}

clearDatabase();

// Run the addUsers
addUsers().then((result) => {
	console.log(`${result.length} Users created!`);
	console.log('Press Ctrl + C to exit.')	
});


