import {Image, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// import {firebase} from '@react-native-firebase/storage';
import {TouchableOpacity} from 'react-native';

const ComposeScreen = () => {
  const [imageData, setImageData] = useState(null);
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setImageData(result);
    console.log(result);
  };

  const uploadImage = async () => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
  };

  // const requestPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'ImageShare App Camera Permission',
  //         message: 'ImageShare App needs access to your camera',
  //         buttonNeutral: 'ask me later',
  //         buttonNegative: 'cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       openCamera();
  //     } else {
  //       console.log('Permission Denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  return (
    <View style={styles.root}>
      {imageData != null ? (
        <Image source={{uri: imageData.assets[0].uri}} style={styles.image} />
      ) : null}
      <View>
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadImage} style={styles.button}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ComposeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  button: {
    backgroundColor: '#003566',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
  },
});
