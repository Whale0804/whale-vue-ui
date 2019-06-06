// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '我的存储',
    icon: 'floppy-o',
    path: '/upload'
  },{
    title: '我的文档',
    icon: 'file-word-o',
    path: '/document'
  },{
    title: '我的资源',
    icon: 'clipboard',
    path: '/files',
    children: [
      {
        title: '公共资源',
        icon: 'chain',
        path: '/files',
      },
      {
        title: '组织资源',
        icon: 'users',
        path: '/files',
      },
      {
        title: '我发布的',
        icon: 'bookmark-o',
        path: '/files',
      }
    ]
  }
]
