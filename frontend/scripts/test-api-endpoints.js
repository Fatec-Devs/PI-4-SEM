const axios = require('axios');

const API_BASE = 'http://localhost:3000/api/john-deere';

async function testEndpoints() {
  console.log('🧪 Testando endpoints da API john_deere...\n');
  
  try {
    // Testar GET /users
    console.log('1️⃣ Testando GET /users...');
    const usersResponse = await axios.get(`${API_BASE}/users`);
    console.log('✅ GET /users:', {
      status: usersResponse.status,
      count: usersResponse.data.count,
      firstUser: usersResponse.data.data[0]
    });
    
    // Testar GET /teams
    console.log('\n2️⃣ Testando GET /teams...');
    const teamsResponse = await axios.get(`${API_BASE}/teams`);
    console.log('✅ GET /teams:', {
      status: teamsResponse.status,
      count: teamsResponse.data.count,
      teams: teamsResponse.data.data
    });
    
    // Testar POST /auth com credenciais existentes
    console.log('\n3️⃣ Testando POST /auth...');
    const authResponse = await axios.post(`${API_BASE}/auth`, {
      email: 'admin@johndeere.com',
      password: 'root'
    });
    console.log('✅ POST /auth:', {
      status: authResponse.status,
      user: authResponse.data.data.user,
      teams: authResponse.data.data.teams
    });
    
    // Testar POST /users (criar novo usuário)
    console.log('\n4️⃣ Testando POST /users...');
    const newUserResponse = await axios.post(`${API_BASE}/users`, {
      email: 'teste@johndeere.com',
      name: 'Usuário Teste',
      matricula: 'TEST001',
      password_hash: 'teste123',
      role: 'user'
    });
    console.log('✅ POST /users:', {
      status: newUserResponse.status,
      user: newUserResponse.data.data
    });
    
    console.log('\n🎉 Todos os endpoints testados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao testar endpoints:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Erro:', error.message);
    }
  }
}

// Aguardar servidor iniciar
setTimeout(() => {
  testEndpoints();
}, 3000);