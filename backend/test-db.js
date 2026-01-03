require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function testDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    console.log('\n👤 Testing User Model...');
    
    const testUser = await User.create({
      fullName: 'Test User',
      email: 'test' + Date.now() + '@example.com',
      password: 'password123'
    });

    console.log('✅ User created successfully!');
    console.log('User ID:', testUser._id);
    console.log('User Email:', testUser.email);

    await User.findByIdAndDelete(testUser._id);
    console.log('✅ Test user cleaned up');

    await mongoose.connection.close();
    console.log('\n✅ All tests passed!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testDatabase();