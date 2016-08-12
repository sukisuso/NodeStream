/*
*	Libreria js para la aplicacion Node Stream
*
*	Jesus Juan Aguilar -2016
*/

var Media= {};
var Security= {};
Security['localUser'] =null;

//Function to make login
function doLogin (){
	var name = $('#login_name')[0].value;
	var pass = $('#login_pass')[0].value;
	
	if(name == null || name == "" || pass == null || pass == "" ){
		Materialize.toast('Rellene los campos', 2000,'');
		return;
	}
	
	$.ajax({
	  type: "POST",
	  url: 'login/checkUser',
	  data: { user_name: name,
    		  user_passw: pass
	  },
	  success: function (response) {
		 if (response == false){
			 Materialize.toast('Error User/Pass', 2000,'Try again');
		 }else{
			 $('#loginZone')[0].hidden = true;
			 Security['localUser'] = response;
			 Security.startEmit();
		 }
	  }
	});
	
	
}

function doRegister() {
	
	$.ajax({
	  type: "POST",
	  url: 'login/newUser',
	  data: { user_name: 'suki',
    		  user_passw: 'hello',
    		  user_email: 'suso_mdo@hotmail.com'},
	  success: function (response) {
		  alert("camo");
	  }
	});
}

function launchModal(){
	$('#modal1').openModal();
}

/*
+ Function to close 
*/
function cancelEmit () {
	clearInterval(Security.interval);
	document.getElementById('video').src = "";
	Media.socket.disconnect();
}



Security.startEmit = function () {
	var canvas = document.getElementById('preview');
	var context = canvas.getContext('2d');
	var video = document.getElementById('video');
		
	canvas.width = 270;
	canvas.height = 150;
	context.width = canvas.width;
	context.height = canvas.height;
		
	Media.socket =  io.connect('https://192.168.1.207');
	
	Media.loadCam = function(stream){
		video.src = window.URL.createObjectURL(stream);
	}

	Media.viewVideo = function (video){
		context.drawImage(video,0,0, context.width, context.height);
		Media.socket.emit('stream', canvas.toDataURL('image/webp'));
	}
	Media.camError = function () {
		Materialize.toast('Error con tu cam', 2000,'');
	}
		
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
							 navigator.mozGetUserMedia || navigator.msgGetYserMedia);

	if(navigator.getUserMedia){

		navigator.getUserMedia({video: true}, Media.loadCam,Media.camError);	
	}

	Security.interval = setInterval(function(){
		Media.viewVideo(video, context);
	}, 300);
	
	routResponsesIo();
	
}


function routResponsesIo() {
	
Media.socket.on('stream',function(image){
			var img = document.getElementById('play');
			img.src = image;
	});
	
	
	Media.socket.on('txt',function(image){
	});
};

