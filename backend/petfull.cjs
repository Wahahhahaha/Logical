require('dotenv').config();
(async () => {
  const login = await fetch('http://localhost:4000/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'STU-001', password: '12345' }) });
  const loginBody = await login.json();
  const pet = await fetch('http://localhost:4000/api/student/pet', { headers: { Authorization: `Bearer ${loginBody.token}` } });
  console.log('PET', pet.status, await pet.text());
  const acts = await fetch('http://localhost:4000/api/student/activities', { headers: { Authorization: `Bearer ${loginBody.token}` } });
  console.log('ACTS', acts.status, await acts.text());
  const me = await fetch('http://localhost:4000/api/auth/me', { headers: { Authorization: `Bearer ${loginBody.token}` } });
  console.log('ME', me.status, await me.text());
})();
