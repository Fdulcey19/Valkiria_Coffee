const setItem = (key, value) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error storing ${key} in localStorage:`, error);
    }
}

const getItem = (key) => {
    const storedValue = window.localStorage.getItem(key);
    try {
        return storedValue ? JSON.parse(storedValue) : undefined;
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