import {auth, db} from './firebase';

export const getUserId = () => {
  return auth.currentUser.uid;
};

export const createUser = async () => {
  console.log('createUser start');
  const userId = getUserId();
  await db
    .collection('users')
    .doc(userId)
    .set({
      name: auth.currentUser.displayName || auth.currentUser.email,
      email: auth.currentUser.email,
      uid: userId,
    });
  console.log('createUser');
};

export const getUser = async () => {
  const userId = getUserId();
  const user = await db.collection('users').doc(userId).get();
  return user.data();
};

export const listAllUsers = async () => {
  const users = await db.collection('users').get();
  return users.docs.map(doc => doc.data());
};

export const mapImageUpload = async url => {
  const userId = getUserId();
  await db.collection('users').doc(userId).collection('images').add({
    imageUrl: url,
    timestamp: Date.now(),
  });
};

export const shareImageWith = async (users, url) => {
  const ownerId = getUserId();
  for (const userId of users) {
    await db.collection('users').doc(userId).collection('shared').add({
      imageUrl: url,
      timestamp: Date.now(),
      owner: ownerId,
    });
    console.log('shared with ' + userId);
  }
};

export const getUsersImage = async () => {
  const userId = getUserId();
  const images = await db
    .collection('users')
    .doc(userId)
    .collection('images')
    .get();
  return images.docs.map(doc => doc.data());
};

export const getSharedImages = async () => {
  const userId = getUserId();
  const images = await db
    .collection('users')
    .doc(userId)
    .collection('shared')
    .get();
  return images.docs.map(doc => doc.data());
};
