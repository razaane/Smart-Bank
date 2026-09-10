const storedUsers = "users";

export function getUsers(){
    const data = localStorage.getItem(storedUsers);
    if(data){
        return JSON.parse(data);
    }else{
        return [];
    }
}

export function SaveUsers(user){
    const users = getUsers();
    users.push(user);

    localStorage.setItem(storedUsers,JSON.stringify(users));
}

export function findByEmail(email){
    const users = getUsers();

    return users.find((u)=>u.email === email);
}

export function findUserById(id){
    const users =getUsers();
    return users.find((u)=>u.id === id);
}