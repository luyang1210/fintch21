import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
//import { ImageManipulator } from 'expo-image-crop';

export default function Add(props) {
  const { colors } = useTheme();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      // const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      // setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImage(data.uri)
      props.navigation.navigate('Root', { image: image })
      //setVisible(true)
    }
  }

  const onToggleModal = () => {
    setVisible(!visible)
  }

  if (hasCameraPermission === null ) { //|| hasGalleryPermission === false
    return <View />;
  }
  if (hasCameraPermission === false ) {  //|| hasGalleryPermission === false
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'4:3'} />
      </View>

      <View>
        <Button
          icon="camera"
          mode="contained"
          color={colors.primary}
          onPress={() => takePicture()}
          style={styles.submitButton}
          labelStyle={{
            fontWeight: '600',
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          <Text style={{ color: 'white', alignSelf: 'center' }}>Take a Selfie</Text>
        </Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    //flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 4 / 3
  },
  submitButton: {
    //flexDirection: "row",
    backgroundColor: "#85B819",
    justifyContent: "center",
    padding: 0,
    alignSelf: "center",
    width: '100%',
    height: 54,
    borderRadius: 0,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: 'gray'
  },
})
