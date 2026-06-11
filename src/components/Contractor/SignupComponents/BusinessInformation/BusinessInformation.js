import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { images } from '../../../../assets/images';
import AppColor from '../../../../helpers/AppColor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePicker } from '../../../../helpers/usePicker';
import styles from './style';
const BusinessInformation = ({ props }) => {
  const [image, setImage] = useState();
  const openImagePicker = usePicker('image', setImage);
  const handleImagePick = async () => {
    try {
      const res = await openImagePicker();

      if (!res || !Array.isArray(res) || res.length === 0) {
        return;
      }

      const finalSelectedImage = res[0];
      if (!finalSelectedImage) return;
      props.setForm(prev => ({
        ...prev,
        businessLogo: finalSelectedImage,
      }));
    } catch (err) {
      console.log('Image pick error:', err);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View style={styles.mainView1}>
          <Text style={styles.heading}>
            Enter your business information like register Business name, email,
            contact number and address and logo for customize invoicing.
          </Text>
        </View>
        <View style={styles.view}>
          <View style={styles.touch}>
            {props.form.businessLogo === '' ? (
              <Image
                source={images.emptyImage}
                style={{ height: 200, width: 200 }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={{ uri: props.form.businessLogo.uri }}
                style={{ height: 200, width: 200 }}
                resizeMode="cover"
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => handleImagePick()}
            style={styles.button}
          >
            <Image
              source={images.uploadIcon}
              style={{ height: 40, width: 40 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.mainView}>
          <View style={styles.emailContainer}>
            <Text style={styles.text}>Business Name</Text>
            <TextInput
              value={props.form.businessName}
              placeholder="i.e. Roofing Express"
              style={styles.emailInput}
              placeholderTextColor="#726666"
              onChangeText={text => {
                props.setForm(prev => ({
                  ...prev,
                  businessName: text,
                }));
              }}
              cursorColor={AppColor.primaryBlue}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.text}>Business Email</Text>
            <TextInput
              value={props.form.businessEmail}
              placeholder="i.e. davisjohn@example.com"
              style={styles.emailInput}
              placeholderTextColor="#726666"
              onChangeText={text => {
                props.setForm(prev => ({
                  ...prev,
                  businessEmail: text,
                }));
              }}
              autoCapitalize="none"
              cursorColor={AppColor.primaryBlue}
            />
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.text}>Business Phone</Text>
            <TextInput
              value={props.businessPhone}
              placeholder="i.e. (123) 456 8861"
              style={styles.emailInput}
              placeholderTextColor="#726666"
              onChangeText={text => {
                props.setForm(prev => ({
                  ...prev,
                  businessPhone: text,
                }));
              }}
              cursorColor={AppColor.primaryBlue}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BusinessInformation;
