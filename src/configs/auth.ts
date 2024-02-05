export default {
  meEndpoint: '/api/users/me',
  requestMessageEndpoint: '/api/auth/request-message',
  connectWalletEndpoint: '/api/auth/connect-wallet',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
