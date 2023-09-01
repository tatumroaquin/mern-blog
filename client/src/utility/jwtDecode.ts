export function jwtDecode(jwt: string) {
  if (!jwt) return '';
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/, '/');
  return JSON.parse(atob(base64));
}
