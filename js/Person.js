function Person(firstName, lastName, email, guid){

	var firstName = firstName;
	var lastName = lastName;
	var email = email;
	var guid = guid;
	var secretSanta = null;

	this.getFirstName = function(){
		return firstName;
	}
	this.setFirstName = function(fn){
		firstName = fn;
	}

	this.getLastName = function(){
		return lastName;
	}
	this.setLastName = function(ln){
		lastName = ln;
	}

	this.getEmail = function(){
		return email;
	}
	this.setEmail = function(e){
		email = e;
	}

	this.getGUID = function(){
		return guid;
	}
	this.setGUID = function(g){
		guid = g;
	}

	this.getSecretSanta = function(){
		return secretSanta;
	}
	this.setSecretSanta = function(ss){
		secretSanta = ss;
	}
}