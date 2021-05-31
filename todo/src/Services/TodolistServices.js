const KEYS={
    todo:'todo',
    todoid:'todoId'
}





export function generateProductId(){
    if(localStorage.getItem(KEYS.todoid)==null){
        localStorage.setItem(KEYS.todoid,'0')
    }
    var id = parseInt(localStorage.getItem(KEYS.todoid))
    localStorage.setItem(KEYS.todoid,(++id).toString())
    return id;
}

export function getallProducts(){
    if(localStorage.getItem(KEYS.todo)==null){
        localStorage.setItem(KEYS.todo,JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem(KEYS.todo));
}

export function insertProduct(data){
    let todos = getallProducts();
    data['id'] = generateProductId();
    todos.push(data);
    localStorage.setItem(KEYS.todo,JSON.stringify(todos))

}
