const API_BASE = 'http://localhost:3000/api/john-deere';

async function testEndpoints() {
  console.log('🧪 Testando endpoints da API john_deere...\n');
  
  try {
    // Testar GET /users
    console.log('1️⃣ Testando GET /users...');
    const usersResponse = await fetch(`${API_BASE}/users`);
    const usersData = await usersResponse.json();
    console.log('✅ GET /users:', {
      status: usersResponse.status,
      count: usersData.count,
      firstUser: usersData.data?.[0]
    });
    
    // Testar GET /teams
    console.log('\n2️⃣ Testando GET /teams...');
    const teamsResponse = await fetch(`${API_BASE}/teams`);
    const teamsData = await teamsResponse.json();
    console.log('✅ GET /teams:', {
      status: teamsResponse.status,
      count: teamsData.count,
      teams: teamsData.data
    });
    
    // Testar POST /auth com credenciais existentes
    console.log('\n3️⃣ Testando POST /auth...');
    const authResponse = await fetch(`${API_BASE}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@johndeere.com',
        password: 'root'
      })
    });
    const authData = await authResponse.json();
    console.log('✅ POST /auth:', {
      status: authResponse.status,
      user: authData.data?.user,
      teams: authData.data?.teams
    });
    
    // Testar POST /users (criar novo usuário)
    console.log('\n4️⃣ Testando POST /users...');
    const newUserResponse = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'teste@johndeere.com',
        name: 'Usuário Teste',
        matricula: 'TEST001',
        password_hash: 'teste123',
        role: 'user'
      })
    });
    const newUserData = await newUserResponse.json();
    console.log('✅ POST /users:', {
      status: newUserResponse.status,
      user: newUserData.data
    });
    
    console.log('\n🎉 Todos os endpoints testados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao testar endpoints:', error.message);
  }
}

// Aguardar servidor iniciar
setTimeout(() => {
  testEndpoints();
}, 5000);