import paths from '@constants/paths'

export interface MenuItem {
  name: string
  code: string
  children: MenuItem[]
}

export const menus: MenuItem[] = [
  {
    name: '首页',
    code: paths.main,
    children: []
  },
]

export const pathMap = new Map<string, MenuItem>()
export const parentMap = new Map<string, string>()

function getPathMap(menus: MenuItem[], map: Map<string, MenuItem>): void {
  menus.forEach(menu => {
    if (menu.children.length > 0) {
      getPathMap(menu.children, map)
    }

    map.set(menu.code, menu)
  })
}

function getParentMap(menus: MenuItem[], map: Map<string, string>, parentCode?: string): void {
  menus.forEach(menu => {
    if (menu.children.length > 0) {
      getParentMap(menu.children, map, menu.code)
    }

    if (parentCode) {
      parentMap.set(menu.code, parentCode)
    }
  })
}

getPathMap(menus, pathMap)
getParentMap(menus, parentMap)
