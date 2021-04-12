const PERMISSION = "permission";

export const getPermission = () => {
  const permissions =
    sessionStorage.getItem(PERMISSION) || localStorage.getItem(PERMISSION);
  return JSON.parse(permissions);
};

export const savePermission = (permission, remember) => {
  const permissions = JSON.stringify(permission);
  if (remember) return localStorage.setItem(PERMISSION, permissions);
  sessionStorage.setItem(PERMISSION, permissions);
};

export const removePermission = () => {
  sessionStorage.removeItem(PERMISSION);
  localStorage.removeItem(PERMISSION);
};
