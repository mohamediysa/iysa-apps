//the side bar functions

let saved_links = document.querySelector('#saved_links');
let clearBtn = document.querySelector('#clear');

function saved() {
		keys = Object.keys(localStorage); 

		if (keys != 0 && keys != null && keys != '') {
			for (let i in keys) {
				let storagData = JSON.parse(localStorage.getItem(keys[i]));
				let arrOfstoragData = storagData.split(',');
				let links = arrOfstoragData.map(a => `<a href='${a}' target='blank' class='navLinks'>${a}</a>`);
				saved_links.innerHTML += `<li class="loadLocal">${links}</li>`	
				
				
			}
		}

		else {
			clearBtn.style.display = 'none'
			saved_links.innerHTML = `<p>you didn't create any links</p>`
		}


		// REMOVING UNDEFINED FROM THE STORAGE
		let arrayOfKeys = [...keys]
		for (let i in arrayOfKeys) {
			if (arrayOfKeys[i].toLowerCase() == 'undefined'.toLowerCase()) {
				localStorage.removeItem(arrayOfKeys[i])
			}
		
	}	
};

window.addEventListener('load', saved);



// **** CLEAR LOCALSTORAGE ****
function clear() {
	localStorage.clear();
	location.reload();
}
clearBtn.addEventListener('click', clear);



//  SIDE BAR 
let sideBar = document.querySelector('#side-bar');
let open = document.querySelector('#open');
let close = document.querySelector('#close');

open.addEventListener('click', ()=> {
	sideBar.style.display = 'block';
	open.style.display = 'none';
	close.style.display = 'block'
})

close.addEventListener('click', ()=> {
	sideBar.style.display = 'none';
	open.style.display = 'block';
	close.style.display = 'none'
})