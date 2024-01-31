const setItem = (key, value) => {
    try {
        console.log(`Setting ${key} in localStorage:`, value);
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error storing ${key} in localStorage:`, error);
    }
}

const getItem = (key) => {
    const storedValue = window.localStorage.getItem(key);
    try {
        return storedValue ? storedValue : undefined;
    } catch (error) {
        console.error(`Error parsing ${key} from localStorage:`, error);
        return undefined;
    }
}

export function setUser(user) {
    setItem('user', user);
  }

export function getUser() {
    return getItem('user');
}