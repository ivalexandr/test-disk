export const setToLocalStorage = (key: string, data: object): void => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};

export const getFromLocalStorage = <T>(key: string): T | undefined => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data) as T;
  }
};
