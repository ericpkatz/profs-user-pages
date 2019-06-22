const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/profs_user_pages_db');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING
  }
});

const Page = conn.define('page', {
  title: {
    type: Sequelize.STRING
  }
});

Page.belongsTo(User, { as: 'author'});
User.hasMany(Page, { foreignKey: 'authorId'});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const moe = await User.create({ name: 'moe'});
  const larry = await User.create({ name: 'larry'});
  const curly = await User.create({ name: 'curly'});
  await Page.create({ title: 'Moes Story', authorId: moe.id});
  await Page.create({ title: 'Moes Other Story', authorId: moe.id});
  await Page.create({ title: 'Larrys Great Story', authorId: larry.id});
  await Page.create({ title: 'Larrys Other Great Story', authorId: larry.id});
};

module.exports = {
  syncAndSeed,
  models: {
    User,
    Page
  }
};
