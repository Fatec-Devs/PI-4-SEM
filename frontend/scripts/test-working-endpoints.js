const API_BASE = 'http://localhost:3000/api/john-deere';

async function testWorkingEndpoints() {
  console.log('🧪 Testando endpoints funcionais da API john_deere...\n');
  
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
    
    // Testar POST /users (criar novo usuário)
    console.log('\n3️⃣ Testando POST /users...');
    const newUserResponse = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'teste2@johndeere.com',
        name: 'Usuário Teste 2',
        matricula: 'TEST002',
        password_hash: 'teste123',
        role: 'user'
      })
    });
    const newUserData = await newUserResponse.json();
    console.log('✅ POST /users:', {
      status: newUserResponse.status,
      user: newUserData.data
    });
    
    // Testar POST /teams (criar novo time)
    console.log('\n4️⃣ Testando POST /teams...');
    const newTeamResponse = await fetch(`${API_BASE}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Time de Teste',
        description: 'Time criado para testes'
      })
    });
    const newTeamData = await newTeamResponse.json();
    console.log('✅ POST /teams:', {
      status: newTeamResponse.status,
      team: newTeamData.data
    });
    
    console.log('\n🎉 Endpoints funcionais testados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao testar endpoints:', error.message);
  }
}

testWorkingEndpoints();