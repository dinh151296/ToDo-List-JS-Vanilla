// select element
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');


// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


// variables
let LIST , id ;
// get item from local storage
let data = localStorage.getItem("TODO");
// check if data is not empty
if (data){
	LIST = JSON.parse(data) ;
	id = LIST.length ;
	loadList(LIST);
}else{
	LIST = [];
	id = 0;
}

// load items to the users interface
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	})
}

// clear local storage
clear.addEventListener('click', function(){
	localStorage.clear();
	location.reload();
})
// show today
const today = new Date();
dateElement.innerHTML = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

// add to-do
function addToDo(toDo, id, done, trash){

	if(trash){return;}
	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

	const item = '<li class="item"><i class="fa '+ DONE +' co" job="complete" id="'+id+'"></i><p class="text '+ LINE +'">' +  toDo +'</p><i class="fa fa-trash-o de" job="delete" id="'+id+'"></i></li>';
	const position = "beforeend";
	list.insertAdjacentHTML(position, item);
}

// add one item to list user the enter key
document.addEventListener('keyup', function(e){
	if(e.keyCode === 13) {
		const toDo = input.value;

		if(toDo){
			addToDo(toDo);

			LIST.push({
				name: toDo,
				id: id,
				done: false,
				trash:false,
			});
			// get item from local storage
			localStorage.setItem("TODO", JSON.stringify(LIST));
		}input.value = '';
	}
})


//complete to-do
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to-do
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);

	LIST[element.id].trash = true;
}

// targets the items created dynamically
list.addEventListener('click', function(e){
	const element = e.target;
	const elementJob = element.attributes.job.value;

	if (elementJob == 'complete'){
		completeToDo(element);
	}else if (elementJob == 'delete'){
		removeToDo(element);
	}
	// get item from local storage
	localStorage.setItem("TODO", JSON.stringify(LIST));
})