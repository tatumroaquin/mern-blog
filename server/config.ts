export const allowedOrigins = [
  'https://localhost:4173',
  'https://localhost:5173',
  'https://192.168.0.32:5173',
  'https://192.168.0.31:5173',
];
export const sslCertificates = {
  publicKey: '../ssl/tblog-crt.pem',
  privateKey: '../ssl/tblog-key.pem',
  caPublicKey: '../ssl/chain.pem',
};
