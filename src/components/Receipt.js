import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'react-native-fetch-blob';

function Receipt({receipt}) {
  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      return granted;
    } catch (err) {
      console.error('Failed to request permission ', err);
      return null;
    }
  };

  const handleDownload = (url) => {
    requestExternalStoragePermission()
      .then((res) => {
        res == 'granted'
          ? saveToGallery(url)
          : Alert.alert(
              'Permission Required',
              'Storage Access is required to download receipt.',
            );
      })
      .catch((err) => console.log(err));
  };

  const saveToGallery = (url) => {
    Platform.OS === 'android'
      ? RNFetchBlob.config({
          fileCache: true,
          appendExt: 'jpg',
        })
          .fetch('GET', url)
          .then((res) => {
            CameraRoll.save(res.path())
              .then(Alert.alert('Success', 'Receipt added to camera roll!'))
              .catch((err) => console.log('err:', err));
          })
          .catch(() => Alert.alert('Error', 'Invalid receipt!'))
      : CameraRoll.save(url).then(
          Alert.alert('Success', 'Receipt added to camera roll!'),
        );
  };

  return (
    <TouchableOpacity onPress={() => handleDownload(receipt)}>
      <Ionicon
        style={{fontSize: 32, marginHorizontal: 20}}
        name="receipt-outline"
        type="Ionicons"
      />
    </TouchableOpacity>
  );
}

export default Receipt;
