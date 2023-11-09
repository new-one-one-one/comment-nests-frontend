function storeTokenInLocalStorage(token) {
    return localStorage.setItem('jwtToken', token);
}
  
function getTokenFromLocalStorage(key="jwtToken") {
    return localStorage.getItem(key);
}

export {
    storeTokenInLocalStorage,
    getTokenFromLocalStorage
}