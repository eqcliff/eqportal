export interface MenuItem {
  name: string
  path: string
  isActive?: boolean
}

export interface MenuConfig {
  mainMenu: MenuItem[]
  subMenus: {
    [key: string]: MenuItem[]
  }
}