import { form } from '@/constans/forms'
import { hasPermission } from '@/services/api/permission.service'
export const items = [
  {
    icon: 'home',
    to: '/',
    title: 'Inicio',
    form: 'FULL'
  },
  {
    icon: 'query_builder',
    to: '/pendiente',
    title: 'Pendientes',
    form: form.pendiente
  },
  {
    icon: 'assignment',
    to: '/actividad',
    title: 'Actividad',
    form: form.actividad
  },
  {
    icon: 'attach_money',
    to: '/cobro',
    title: 'Cobros',
    form: form.cobro
  },
  {
    icon: 'add_shopping_cart',
    to: '/concepto',
    title: 'Conceptos',
    form: form.concepto
  },
  {
    icon: 'account_box',
    to: '/cliente',
    title: 'Clientes',
    form: form.cliente
  },
  {
    icon: 'category',
    to: '/categoria',
    title: 'Categorias',
    disableFooter: true,
    form: form.categoria
  },
  {
    icon: 'group',
    to: '/usuario',
    title: 'Usuarios',
    disableFooter: true,
    form: form.usuario
  },
  {
    icon: 'analytics',
    to: '/analytics',
    title: 'Analytics',
    disableFooter: true,
    form: form.analytics
  }
]

export const navs = () => items.filter((nav) => hasPermission(nav.form))
