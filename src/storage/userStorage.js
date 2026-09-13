
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

export function updateUser(id,data){
    const users = getUsers();
    const index =users.findIndex((u)=>u.id === id);
    if (index === -1) {
        return false;
    }

    users[index] = { ...users[index], ...data };
    localStorage.setItem("users", JSON.stringify(users));
    return true;
    
}

export function saveCredits(id,data){
    const users = getUsers();

    const user = users.find((user) => user.id === id);

    if (!user) {
        return false;
    }
    if (!user.credits) {
        user.credits = [];
    }
    user.credits.push(data);
    localStorage.setItem("users",JSON.stringify(users));
    return true;
}