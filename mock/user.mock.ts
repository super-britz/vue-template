import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/api/user/info',
    method: 'GET',
    body: {
      code: 0,
      data: {
        id: 1,
        username: 'admin',
        nickname: '管理员',
        avatar: '',
        roles: ['admin'],
        permissions: ['*'],
      },
      message: 'ok',
    },
  },
])
