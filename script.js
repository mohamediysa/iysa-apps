
//**** SELECTORS****
let btn = document.querySelector("#btn");
let shorted_link = document.querySelector('#shorted_link');
let short1 = document.querySelector('#short_link1');
let short2 = document.querySelector('#short_link2');
let abuse = document.querySelector('#abuse');
let origin = document.querySelector('#origin');


let arrOfLinks = [];
let statusCode = 0;

function fetchApi() {
	let loader = document.querySelector(".loader");
	loader.style.display = 'block';
	let link = document.querySelector('#link');

	// IF THE BOX input IS EMPTY
	if (link.value == '' || link.value == null) {
		link.style.background  = '#ff8282 ';
		link.style.border = '#ff8282'
		location.reload(); 
	}

	// API
	let api = `https://api.shrtco.de/v2/shorten?url=${link.value}`;

	fetch(api)
		.then(respond => respond.json())
		.then(data => {
			for (i in data) {
				for (j in data[i]) {
					arrOfLinks.push(data[i][j]);
					localStorage.setItem(data[i]['code'], JSON.stringify(`${data[i]['original_link']} , ${data[i]['full_short_link']} , ${data[i]['full_short_link2']}`))
				}

				loader.style.display = 'none';
				origin.innerHTML = `<span ><a  target="_blank" href="${data[i]['original_link']}">${data[i]["original_link"]}</a></span><button class="copy"><i id='${data[i]["original_link"]}' class="bi bi-clipboard" onclick='copy(id)'></i></button>`;
				short1.innerHTML = `<span class="myspan"><a  target="_blank" href="${data[i]['full_short_link']}">${data[i]["full_short_link"]}</a></span><button class="copy"><i id='${data[i]["full_short_link"]}' class="bi bi-clipboard" onclick='copy(id)'></i></button> `;
				short2.innerHTML = `<span class="myspan"><a  target="_blank" href="${data[i]['full_short_link2']}">${data[i]["full_short_link2"]} </a></span><button class="copy"><i id='${data[i]["full_short_link2"]}' class="bi bi-clipboard" onclick='copy(id)'></i></button>`;
				abuse.innerHTML = `<a class="abuse" href="${data[i]["full_share_link"]}" target="_blank">report abuse <i class="bi bi-exclamation-circle-fill"></i></a>`;
				
			}
		link.value = '';
		
		})

		.catch(err => alert(err))

}


//hit enter to short link
btn.addEventListener('click', fetchApi)
document.querySelector('#link').addEventListener('keydown', (e)=>{
	if (e.keyCode ===  13) {
		fetchApi()
	}
})




//COPY TO CLIPBOARD
function copy(id) {
	 navigator.clipboard.writeText(id);
	 alert(id +" is copied")
}



//COOKIES
let cookiMessage = document.getElementById("cookies");

function cookieFn() {

	if (navigator.cookieEnabled == true) {
		cookiMessage.style.display = 'none';
		console.log('cookies is on');
	}

	else{
		cookiMessage.style.display = 'block';
	}
};

document.addEventListener('load', cookieFn)


function allow() {
	navigator.cookieEnabled = true;
	cookiMessage.style.display = 'none';
	alert('cookies allowed thanks :)');

};

function deny() {
	navigator.cookieEnabled = false;
	cookiMessage.style.display = 'none';
	alert('cookies denied :(');
}
