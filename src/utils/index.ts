export function localGet (key: any) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(<string>window.localStorage.getItem(key))
  } catch (error) {
    return value
  }
}

export function localSet (key: any, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove (key: string) {
  window.localStorage.removeItem(key)
}

export const pathMap = {
  welcome: 'Welcome',
  extensions: 'Extensions',
  extensions_edit: 'Extension',
  gateways: 'Gateways',
  gateways_edit: 'Gateway',
  destinations: 'Destinations',
  destination_edit: 'Destination',
  managers: 'Dialplan Manager',
  manager_edit: 'Dialplan Manager',
  inbounds: 'Inbound Routes',
  inbound_edit: 'Dialplan Inbound',
  outbounds: 'Outbound Routes',
  outbound_edit: 'Dialplan Outbound',
  dialplan_xml: 'Dialplan XML',
  login: 'Login',
}