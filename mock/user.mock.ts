import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    url: '/api/user/info',
    method: 'GET',
    body: {
      resultCode: '1000',
      resultDesc: 'success',
      data: {
        uuid: '1',
        username: 'admin',
        nickname: '管理员',
        position: '管理员',
        phone: '',
        email: 'admin@example.com',
        avatar: '',
        loginType: 0,
        lastLogin: '2026-03-10 10:00:00',
        authorities: ['*'],
        labels: [],
        openApis: [],
      },
    },
  },
])
