import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

// import {firebase} from '@react-native-firebase/storage';
import {TouchableOpacity} from 'react-native';
import {auth, storage} from '../firebase';
import {mapImageUpload} from '../server';

const ComposeScreen = () => {
  const [imageData, setImageData] = useState(null);
  const [remImage, setRemImage] = useState(true);
  const navigation = useNavigation();

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setImageData(result);
    setRemImage(true);
    console.log(result);
  };

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    const result = await launchImageLibrary(options);
    setImageData(result);
    setRemImage(true);
    console.log(result);
  };

  const uploadImage = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.log('User is not signed in');
        // Handle the case when the user is not signed in
        return;
      }

      // const reference = storage.ref(imageData.assets[0].fileName);
      const reference = storage.ref(
        `images/${currentUser.uid}/${imageData.assets[0].fileName}`,
      );
      const pathToFile = imageData.assets[0].uri;
      const blob = await (await fetch(pathToFile)).blob();

      console.log(blob);
      const result = await reference.put(blob);
      const downloadLink = await result.ref.getDownloadURL();
      console.log('Image uploaded successfully');
      await mapImageUpload(downloadLink);
      console.log('Image mapped successfully');
      Alert.alert(
        'Image Status',
        'Image uploaded successfully',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              setRemImage(false);
              navigation.navigate('Home', {
                timestamp: Date.now(),
              });
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
      {imageData != null ? (
        <Image
          source={remImage ? {uri: imageData.assets[0].uri} : null}
          style={styles.image}
        />
      ) : null}
      <View>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={openCamera} style={styles.button}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={styles.button}>
            <Text style={styles.buttonText}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={uploadImage}
          style={[styles.button, styles.uploadButton]}>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#003566',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    margin: 5,
  },
  buttonText: {
    color: 'white',
  },
});
