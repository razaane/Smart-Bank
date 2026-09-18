import { getUsers } from "../storage/userStorage";

const users_storage ="users";

export function addHistoryEntry(userId,entry){
    const users =getUsers();
    const index = users.findIndex((u)=>u.id ===userId);
    if( index=== -1 )
    return false;

    if(!users[index].history){
        users[index].history =[];
    }

    users[index].history.unshift({...entry,date: new Date().toISOString()});

    localStorage.setItem(users_storage,JSON.stringify(users));
    return true;
}


export function getHistory(userId){
    const users = getUsers();
    const user=users.find((u)=> u.id ===userId);
    if(!user) return [];
    if (!user.history) return [];

    return user.history;
}