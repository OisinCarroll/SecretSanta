function SecretSanta(jsonFile){

	var allPersons = [];
	this.jsonFile = jsonFile;

	this.init = function(){
		this.loadJson(this.jsonFile);
		initButtons();
	}


	this.loadJson = function(url){
		$.ajax({
			dataType: "json",
			url: url,
			data: '',
			success: function(data){
				$.each(data.users, function(index, item){
					var p = new Person(item.name.first, item.name.last, item.email, item.guid);
					addToPersons(p);
				});

				renderPersonList();
			}
		});
	}

	function addToPersons(p){
		allPersons.push(p);
	}

	function initButtons(){

		$('.start-pairing').on('click', function(){
			$('.shuffle').css('visibility', 'visible');
			window.APP.generatePairings();
		});

		$('.shuffle').on('click', function(){
			$('.pairing-container').remove();
			window.APP.generatePairings();
		});

		$('.save-person-button').on('click', function(){
			var firstName = $('#firstName').val();
			var lastName = $('#lastName').val();
			var email = $('#inputEmail').val();

			if(firstName !== '' && firstName !== ' ' &&
				lastName !== '' && lastName !== ' ' &&
				email !== '' && email !== ' ' 
			){
				var rand1 = Math.random().toString(36).substring(2, 10);
				var rand2 = Math.random().toString(36).substring(2, 6);
				var rand3 = Math.random().toString(36).substring(2, 6);
				var rand4 = Math.random().toString(36).substring(2, 6);
				var rand5 = Math.random().toString(36).substring(2, 14);
			    var guid = rand1 + '-' + rand2 + '-' + rand3 + '-' + rand4 + '-' + rand5;
				var p = new Person(toUpperCase(firstName), toUpperCase(lastName), email, guid);
				addToPersons(p);
				$('.add-person').click();
				renderPerson(p);
				clearModal();
			}	
		});

		$('.update-person-button').on('click', function(){
			var firstName = $('#ufirstName').val();
			var lastName = $('#ulastName').val();
			var email = $('#uinputEmail').val();
			var guid = $('#guid').attr('value');

			if(firstName !== '' && firstName !== ' ' &&
				lastName !== '' && lastName !== ' ' &&
				email !== '' && email !== ' ' 
			){
				//$('.update-person').click();
				var p = getPersonById(guid);
				p.setFirstName(firstName);
				p.setLastName(lastName);
				p.setEmail(email);
				$('.update-person').click();
				showAlert();
				$(".person-container[guid='"+guid+"']").find('.name').html(toUpperCase(firstName) + ' ' + toUpperCase(lastName));
				$(".person-container[guid='"+guid+"']").find('.email').html(email);
			}	
		});
	}

	function nextAnimation(elements){

		elements.eq(0).animate({'opacity': 1}, 150, function()
		{
			nextAnimation(elements.slice(1));  
		});

	}

	function renderPersonList(){
		$.each(allPersons, function(index, item){
			var person = $('<div class="person-container" guid="'+item.getGUID()+'"></div>');
			person.css('opacity', 0);
			person.append('<p class="name">'+item.getFirstName()+' '+item.getLastName()+'</p>');
			person.append('<p class="email">'+item.getEmail()+'</p>');
			$('.person-list').append(person);
		});

		$('.person-container').on('click', function(){
			var guid = $(this).attr('guid');
			var person;
			for(var i = 0; i < allPersons.length; i++){
				if(allPersons[i].getGUID() == guid){
					person = allPersons[i];
					break;
				}
			}

			$('#ufirstName').val(person.getFirstName());
			$('#ulastName').val(person.getLastName());
			$('#uinputEmail').val(person.getEmail());
			$('#guid').attr('value', person.getGUID());
			$('.update-person').click();
		});

		nextAnimation($('.person-container'));
	}

	function renderPerson(pobj){
		
		var person = $('<div class="person-container" guid="'+pobj.getGUID()+'"></div>');
		person.css('opacity', 0).css('height', '0px');
		person.append('<p class="name">'+pobj.getFirstName()+' '+pobj.getLastName()+'</p>');
		person.append('<p class="email">'+pobj.getEmail()+'</p>');
		$('.person-list').prepend(person);
		$('.person-list').scrollTop($('.person-list').children().first())
		person.animate({
		    opacity: 1,
		    height: "74px"
		}, 1000, function() {
		    showAlert();
		});
		person.on('click', function(){
			var guid = $(this).attr('guid');
			var person;
			for(var i = 0; i < allPersons.length; i++){
				if(allPersons[i].getGUID() == guid){
					person = allPersons[i];
					break;
				}
			}

			$('#ufirstName').val(person.getFirstName());
			$('#ulastName').val(person.getLastName());
			$('#uinputEmail').val(person.getEmail());
			$('#guid').attr('value', person.getGUID());
			$('.update-person').click();
		});
	}

	function renderPairingsList(){
		$.each(allPersons, function(index, item){

			var ss;

			for(var i = 0; i < allPersons.length; i++){
				if(item.getSecretSanta() == allPersons[i].getGUID()){
					console.log(item.getFirstName() + " " + item.getLastName() +' has drawn '+ allPersons[i].getGUID());
					console.log(allPersons[i].getFirstName() + " " + allPersons[i].getLastName() + " owns: " + allPersons[i].getGUID());
					console.log('');

					ss = allPersons[i];

					var pairing = $('<div class="pairing-container"></div>');
					pairing.css('opacity', 0);
					var p1 = $('<div class="p1">'+item.getFirstName()+' '+item.getLastName()+'</div>');
					var buyingFor = $('<div class="buying-for"><img class="present" src="img/present.gif" alt="is buying for" /><img class="right-arrow" src="img/right.png" /></div>');
					var p2 = $('<div class="p2">'+ss.getFirstName()+' '+ss.getLastName()+'</div>');
					pairing.append(p1);
					pairing.append(buyingFor);
					pairing.append(p2);

					$('.person-pairings').append(pairing);
					break;
				}
			}

		});

		var pairings = $(".pairing-container");
		var parent = $('.person-pairings');
	    var divs = parent.children();
	    while (divs.length) {
	        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
	    }

		nextAnimation(pairings);
	}

	function toUpperCase(string) 
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function clearModal(){
		$('#firstName').val('');
		$('#lastName').val('');
		$('#inputEmail').val('');
	}

	function showAlert(){
		$('.alert-success').animate({
		    opacity: 1,

		}, 300, function() {
		    $('.alert-success').animate({
			    opacity: 0,

			}, 8000, function(){});
		});
	}

	function shufflePersons() {

	  	var currentIndex = allPersons.length, temporaryValue, randomIndex;

	  	while(0 !== currentIndex){

		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    temporaryValue = allPersons[currentIndex];
		    allPersons[currentIndex] = allPersons[randomIndex];
		    allPersons[randomIndex] = temporaryValue;
	  	}

	}

	this.generatePairings = function(){
		shufflePersons();
		$('.start-pairing').css('display', 'none');
		var l = allPersons.length;

		if(l%2 == 0){ //even
			for(var i = 0; i < l; i++){
				if(i+1 == l){
					//last person, match to first
					allPersons[i].setSecretSanta(allPersons[0].getGUID());

				}else{
					allPersons[i].setSecretSanta(allPersons[i+1].getGUID());
				}
			}
		}else{ //odd
			for(var i = 0; i < l; i++){
				if(i >= (l-4) && i <= (l-1)){
					//last 3 persons, match tri-linearly (Mr.Triangle)
					allPersons[i].setSecretSanta(allPersons[i+1].getGUID());
					allPersons[i+1].setSecretSanta(allPersons[i+2].getGUID());
					allPersons[i+2].setSecretSanta(allPersons[i].getGUID());
					break;

				}else{
					allPersons[i].setSecretSanta(allPersons[i+1].getGUID());
				}
			}
		}

		renderPairingsList();
	}

	this.getPersons = function(){
		return allPersons;
	}

	function getPersonById(guid){
		var person;
		for(var i = 0; i < allPersons.length; i++){
			if(allPersons[i].getGUID() == guid){
				person = allPersons[i];
			}
		}
		return person;
	}

}