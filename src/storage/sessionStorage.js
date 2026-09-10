
const session_key = "currentUser";

export function setCurrentUser(userId){
    localStorage.setItem(session_key,userId);
}

export function getCurrentUser(){
    return localStorage.getItem(session_key);
}

export function clearSession(){
    localStorage.removeItem(session_key)
}