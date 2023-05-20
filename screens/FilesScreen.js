/* eslint-disable react-native/no-inline-styles */
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import {
  getSharedImages,
  getUserId,
  getUsersImage,
  listAllUsers,
  shareImageWith,
} from '../server';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from '@rneui/base';

const FilesScreen = () => {
  const [userImages, setUserImages] = useState([]);
  const [sharedImages, setSharedImages] = useState([]);
  const [options, setoptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedUsers, setselectedUsers] = useState({});

  const [curImage, setcurImage] = useState();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionPress = item => {
    selectedUsers[item.uid] = !selectedUsers[item.uid];
    setselectedUsers({...selectedUsers});
  };

  const handleSend = async () => {
    const url = curImage;
    const users = Object.keys(selectedUsers);
    await shareImageWith(users, url);
    console.log('shared img ' + url, ' with ', users);
  };

  useFocusEffect(
    useCallback(() => {
      getUsersImage().then(imgs => setUserImages(imgs));
      getSharedImages().then(imgs => setSharedImages(imgs));
      listAllUsers().then(users => {
        setoptions(
          users
            .filter(user => user.uid !== getUserId())
            .map((user, idx) => {
              return {id: idx, name: user.name, uid: user.uid};
            }),
        );
      });
    }, []),
  );

  console.log('renderItem');
  const images = [...userImages, ...sharedImages];
  return (
    <View style={styles.container}>
      <ScrollView>
        {images.length ? (
          images.map(img => {
            return (
              <TouchableOpacity
                key={img.imageUrl}
                onPress={() => setcurImage(img.imageUrl)}>
                <Image
                  source={{uri: img.imageUrl}}
                  alt="img"
                  style={{width: 200, height: 200}}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.fileText}>photos will be displayed here</Text>
        )}
      </ScrollView>
      <View>
        <View>
          <TouchableOpacity style={styles.dropDown} onPress={toggleDropdown}>
            <Text style={styles.dropDownText}>Select option</Text>
          </TouchableOpacity>
          <Modal visible={isOpen} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <View style={styles.ddTable}>
                <FlatList
                  data={options}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleOptionPress(item)}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 8,
                        }}>
                        <CheckBox
                          onClick={() => {}}
                          isChecked={selectedUsers[item.uid]}
                        />
                        <Text style={styles.dropDownText}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  style={styles.closeDp}
                  onPress={toggleDropdown}>
                  <Text style={styles.dropDownText}>Close Dropdown</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send Files</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilesScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  fileText: {
    color: 'black',
  },
  dropDown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#003566',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    margin: 10,
  },
  dropDownText: {
    color: 'black',
  },
  ddTable: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 100,
    marginBottom: 129,
    alignSelf: 'stretch',
    margin: 10,
    borderWidth: 1,
    borderColor: '#003566',
    borderRadius: 10,
  },
  closeDp: {
    borderColor: 'black',
    borderWidth: 0.5,
    width: 120,
    borderRadius: 3,
    padding: 5,
  },
  button: {
    backgroundColor: '#003566',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
});
