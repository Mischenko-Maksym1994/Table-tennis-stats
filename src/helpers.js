export function saveToLS(key = "", value = "") {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
};

export function loadToLS(key) {
    
        const result = JSON.parse(localStorage.getItem(key));
    return result ? result : [];
        
};