require('dotenv').config();
(async () => {
  for (const base of ['http://127.0.0.1:4000', 'http://localhost:4000']) {
    try {
      const health = await fetch(base + '/api/health');
      console.log(base, 'health', health.status, await health.text());
    } catch (e) {
      console.log(base, 'ERR', e.cause ? e.cause.message : e.message);
    }
  }
})();
