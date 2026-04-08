const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📌 Add school:   POST http://localhost:${PORT}/api/addSchool`);
  console.log(`📋 List schools: GET  http://localhost:${PORT}/api/listSchools?latitude=0&longitude=0`);
});