function addMonitor(){
	var monitor = setInterval(function() {
  		check();
	}, 100);
}

function check() {
	//console.log('hi');
	if (document.getElementsByClassName('simple-sharing-vertical-spacer')[0] || document.getElementsByClassName('simple-sharing-people-heading')[0] ) {
		var url = (window.location != window.parent.location) ? document.referrer : document.location.href;
		
		if (document.getElementsByClassName('share-doc-to-classroom-button-ext')[0]) {
			//console.log('it\'s there');
		} else if (url.match('https:\/\/docs.google.com/document')){
			addsharebutton();
			clearInterval(monitor);
		}
	} else {
		console.log(document.getElementsByClassName('simple-sharing-vertical-spacer')[0]);
		console.log(document.getElementsByClassName('simple-sharing-people-heading')[0]);
	}
}

addMonitor();


function addsharebutton() {	
	if (document.getElementsByClassName('simple-sharing-vertical-spacer')[0]) {
		var spacer = document.getElementsByClassName('simple-sharing-vertical-spacer')[0];
		spacer.parentNode.removeChild(spacer);
	}
	
	document.getElementsByClassName('data-dialog')[0].style = '';

	var bar = document.getElementsByClassName('simple-sharing-button-bar')[0];
	bar.style = 'margin-top: 0px';

	var insertinto = document.getElementsByClassName('simple-sharing-people-heading')[0];
	var container = document.createElement('div');
	container.classList.add('share-doc-to-classroom-button-ext');
	
	var bry = document.createElement('br');
	container.appendChild(bry);
	var tabley = document.createElement('table');
	var tableyr = document.createElement('tr');
	
	//send message
	//receive message
	chrome.runtime.sendMessage({greeting: "getType"}, function(response) {
  		console.log(response);
  		console.log(response.type);
		var type = response.type;
		if (type == 'icon') {
			var scripty = document.createElement('script');
			scripty.src = 'https://apis.google.com/js/platform.js';
			container.appendChild(scripty);
	
			var divtd = document.createElement('td');

			var divy = document.createElement('div');
			divy.classList.add('g-sharetoclassroom');
			divy.dataset.size = '48';

			var url = (window.location != window.parent.location) ? document.referrer : document.location.href;
	
			divy.dataset.url = url;
			divtd.appendChild(divy);
			
			var texttd = document.createElement('td');;
			var text = document.createElement('p');
			text.innerText = 'Share Doc To Classroom';
			
			texttd.appendChild(text);
			tableyr.appendChild(divtd);
			tableyr.appendChild(texttd);
		} else {
			var texttd = document.createElement('td');
			var stylez = document.createElement('style');
			stylez.innerHTML = '.share-doc-to-classroom-ext-label {\n\tbox-shadow: none;\n\tbackground-color: rgb(227, 226, 226);\n\tcursor: pointer;\n\tborder-color: transparent;\n\tborder-radius: 2px;\n\tborder-width: 1px;\n\tborder-style: inset;\n\tcolor: rgb(0,0,0);\n\tfont-size: 13px;\n\theight: 30px;\n\tpadding: 0 14px;\n\tmargin-right: 8px;\n\t\n\tdisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\t\n\ttext-align: center;\n}\n\n.share-doc-to-classroom-ext-label:hover {\n\tbox-shadow: 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12), 0px 1px 5px 0px rgba(0,0,0,0.2);\n\t\n}';
			texttd.appendChild(stylez);
	
			var text = document.createElement('label');
			text.classList.add('share-doc-to-classroom-ext-label');
			
			var url = (window.location != window.parent.location) ? document.referrer : document.location.href;
			var openurl = 'https://classroom.google.com/share?url=' + encodeURIComponent(url);
			text.addEventListener('click', function(e) {
				window.open(openurl, 'addToClassroomWindow', 'width=500,height=500');
			}, false);
	
			//var text = document.createElement('p');
	
			text.innerText = 'Share Doc to Classroom';
			texttd.appendChild(text);

			tableyr.appendChild(texttd);
		}
	});
	
	/* var url = (window.location != window.parent.location) ? document.referrer : document.location.href; means: 
	if (window.location != window.parent.location) { 
		var url = document.referrer;
	} else {
		var url = document.location.href;
	}
	*/
	
	tabley.appendChild(tableyr);
	container.appendChild(tabley);

	insertinto.insertBefore(container, insertinto.firstChild);
}
