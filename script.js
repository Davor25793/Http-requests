const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const title = document.getElementById('title');


//Get todos
const getTodos = () => {
    fetch(apiUrl + '/?_limit=10')
       .then(res => res.json())
       .then(data => {
            data.forEach(todo => addTodoToDom(todo))
       })
}


//Add to DOM
const addTodoToDom = (todo) => {
    //Create element, ovo može i drugačije ali ajd
    const div = document.createElement('div');
    div.classList.add('todo');
    div.appendChild(document.createTextNode(todo.title))
    div.setAttribute('data-id', todo.id);
    //Moraš ovo napraviti prije svega
    if(todo.completed){
      div.classList.add('done')  
    }

    document.getElementById('todo-list').appendChild(div)
}


//Create Todo 
const createTodo = (e) => {
    
    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
       .then(res => {
            title.value = '';
            addTodoToDom(res);
       }) 
    


    e.preventDefault();
}


//Toggle completed
const toggleCompleted = (e) => {
    if(e.target.classList.contains('todo')){
       e.target.classList.toggle('done')
        
      
       updateTodo(e.target.dataset.id, e.target.classList.contains('done'))
        
    }
}


//Update todo
const updateTodo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({completed}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
      .then(data => console.log(data))
}

//DELETE TODO
const deleteTodo = (e) => {
    if(e.target.classList.contains('todo')){
        const id = e.target.dataset.id;

       fetch(`${apiUrl}/${id}`, {
           method: 'DELETE' 
       })
       .then(res => res.json())
       .then(() => e.target.remove())

     }
}


//Pokretanje stranice
const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos)
    //Ovo po meni ne mora ovdje
    document.querySelector('#todo-form').addEventListener('submit', createTodo)
    //Event za li item
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted)
    //Event za delete
    document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo)
}

init()










