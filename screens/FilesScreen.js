/* eslint-disable react-native/no-inline-styles */
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';

const FilesScreen = () => {
  const options = [
    {id: 1, name: 'Option 1'},
    {id: 2, name: 'Option 2'},
    {id: 3, name: 'Option 3'},
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionPress = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.fileText}>photos will be displayed here</Text>
      </View>
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
                        <CheckBox onClick={() => {}} />
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

        <TouchableOpacity style={styles.button}>
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
