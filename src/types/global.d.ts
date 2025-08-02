// 所有可选类型变为必选类型
type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>
}

// 全局设置类型
export declare namespace Settings {
  interface app {
    /**
     * 颜色方案
     * @默认值 light
     * @可选值 light 亮色模式
     * @可选值 dark 暗黑模式
     * @可选值 os 跟随系统
     */
    colorScheme: 'light' | 'dark' | 'os'
    /**
     * 主题名称
     * @默认值 default
     * @可选值 default 默认主题
     */
    theme: 'default'
  }

  // 所有设置
  interface all {
    app?: app
  }
}
