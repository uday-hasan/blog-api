import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import User from './models/User';
import Blog from './models/Blog';
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mernblog';
const run = async () => {
  await mongoose.connect(uri);
  await User.deleteMany({});
  await Blog.deleteMany({});
  const user = await User.create({ name: 'Test User', email: 'test@example.com', password: await (await import('bcryptjs')).hash('password',10) });
  await Blog.create({ title: 'Hello World', content: 'This is a seed blog.', author: user._id });
  console.log('Seed done. user=test@example.com password=password');
  process.exit(0);
};
run().catch(err=>{ console.error(err); process.exit(1); });
