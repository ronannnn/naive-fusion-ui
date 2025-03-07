/** Header config */
export interface SimpleLayoutHeaderConfig {
  /**
   * Whether header is visible
   *
   * @default false
   */
  hideHeader?: boolean
  /**
   * Header class
   *
   * @default ''
   */
  headerClass?: string
}

/** Tab config */
export interface SimpleLayoutTabConfig {
  /**
   * Whether tab is visible
   *
   * @default true
   */
  hideTab?: boolean
  /**
   * Tab class
   *
   * @default ''
   */
  tabClass?: string
}

/** Sider config */
interface SimpleLayoutSiderConfig {
  /**
   * Whether sider is visible
   *
   * @default true
   */
  hideSider?: boolean
  /**
   * Sider class
   *
   * @default ''
   */
  siderClass?: string
  /**
   * Mobile sider class
   *
   * @default ''
   */
  siderMobileClass?: string
  /**
   * Sider width when collapse is false
   *
   * @default '220px'
   */
  siderWidth?: number
  /**
   * Maximum sider width when collapse is false
   *
   * @default '320px'
   */
  siderMaxWidth?: number
  /**
   * Minimum sider width when collapse is false
   *
   * @default '180px'
   */
  siderMinWidth?: number
  /**
   * Sider collapse status
   *
   * @default false
   */
  siderCollapsed?: boolean
  /**
   * Sider width when collapse is true
   *
   * @default '64px'
   */
  siderCollapsedWidth?: number
  /**
   * Maximum sider width when collapse is true
   *
   * @default '100px'
   */
  siderMaxCollapsedWidth?: number
  /**
   * Minimum sider width when collapse is true
   *
   * @default '50px'
   */
  siderMinCollapsedWidth?: number
}

/** Content config */
export interface SimpleLayoutContentConfig {
  /**
   * Content class
   *
   * @default ''
   */
  contentClass?: string
}

/** Simple layout props */
export interface SimpleLayoutProps
  extends SimpleLayoutSiderConfig,
  SimpleLayoutHeaderConfig,
  SimpleLayoutTabConfig,
  SimpleLayoutContentConfig {
  /** Is mobile layout */
  isMobile?: boolean
  /** Is browser full content */
  isFullContent?: boolean
}
