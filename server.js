import {db} from './firebase';

export const createUser = async (userId, name, email) => {
  await db.collection('users').doc(userId).set({
    name,
    email,
  });
};

export const getUser = async userId => {
  const user = await db.collection('users').doc(userId).get();
  return user.data();
};

export const listAllUsers = async () => {
  const users = await db.collection('users').get();
  return users.docs.map(doc => doc.data());
};

export const mapImageUpload = async (userId, url) => {
  await db.collection('users').doc(userId).collection('images').add({
    imageUrl: url,
    timestamp: Date.now(),
  });
};

export const shareImageWith = async (ownerId, users, url) => {
  for (const userId of users) {
    await db.collection('users').doc(userId).collection('shared').add({
      imageUrl: url,
      timestamp: Date.now(),
      owner: ownerId,
    });
  }
};
