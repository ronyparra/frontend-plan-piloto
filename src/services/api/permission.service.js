import { getPermission } from '../../storage/permission.storage'
export const hasPermission = (form) => {
  if (form === 'FULL') return true
  if (!getPermission()) return false
  const permission = getPermission().find(x => x.formulario === form)
  if (!permission) return false
  return !!Object.entries(permission.permisos).find((arr) => permission.permisos[arr[0]] === true)
}
