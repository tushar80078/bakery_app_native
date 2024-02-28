import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const ModalComponent = ({content, propSetModalVisible, navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text>
            loremkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
          </Text>
          <Button title="Close Modal" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default ModalComponent;
