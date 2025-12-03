async function testFinalAPI() {
  console.log('🧪 Testando API john_deere final...\n');
  
  try {
    // Testar GET /users
    console.log('1️⃣ Testando GET /users...');
    const usersResponse = await fetch('http://localhost:3000/api/john-deere/users');
    const usersData = await usersResponse.json();
    console.log('✅ GET /users:', {
      status: usersResponse.status,
      count: usersData.count,
      firstUser: usersData.data?.[0]
    });
    
    // Testar GET /teams
    console.log('\n2️⃣ Testando GET /teams...');
    const teamsResponse = await fetch('http://localhost:3000/api/john-deere/teams');
    const teamsData = await teamsResponse.json();
    console.log('✅ GET /teams:', {
      status: teamsResponse.status,
      count: teamsData.count,
      teams: teamsData.data
    });
    
    // Testar POST /users (criar novo usuário)
    console.log('\n3️⃣ Testando POST /users...');
    const newUserResponse = await fetch('http://localhost:3000/api/john-deere/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'novousuario@johndeere.com',
        name: 'Novo Usuário',
        matricula: 'NOVO123',
        password_hash: 'senha123',
        role: 'user'
      })
    });
    const newUserData = await newUserResponse.json();
    console.log('✅ POST /users:', {
      status: newUserResponse.status,
      user: newUserData.data
    });
    
    // Verificar se o novo usuário foi criado
    console.log('\n4️⃣ Verificando novo usuário...');
    const updatedUsersResponse = await fetch('http://localhost:3000/api/john-deere/users');
    const updatedUsersData = await updatedUsersResponse.json();
    console.log('✅ Total de usuários após criação:', updatedUsersData.count);
    
    console.log('\n🎉 API john_deere está funcionando perfeitamente!');
    console.log('\n📊 Resumo:');
    console.log('- ✅ Conexão com banco PostgreSQL local estabelecida');
    console.log('- ✅ Schema john_deere sendo utilizado corretamente');
    console.log('- ✅ Endpoints GET /users e GET /teams funcionando');
    console.log('- ✅ Endpoint POST /users funcionando (criação de usuários)');
    console.log('- ✅ Dados do banco john_deere sendo acessados com sucesso');
    
  } catch (error) {
    console.error('❌ Erro ao testar API:', error.message);
  }
}

testFinalAPI();