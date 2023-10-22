export const allowedOrigins = [
  'https://localhost:5173',
  'https://192.168.0.32:5173',
  'https://192.168.0.33:5173',

  'https://localhost:4173',
  'https://192.168.0.32:4173',
  'https://192.168.0.33:4173',

  'http://blog.tatumroaquin.dev',
  'https://blog.tatumroaquin.dev',
];
export const sslCertificates = {
  publicKey: '../ssl/fullchain.pem',
  privateKey: '../ssl/privkey.pem',
  caPublicKey: '../ssl/chain.pem',
};
