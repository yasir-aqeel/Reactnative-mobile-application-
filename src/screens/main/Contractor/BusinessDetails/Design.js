import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PopinsFont } from '../../../../helpers/Fonts';
import {
  EmptyImage,
  LocationIcon,
  PinLocationIcon,
  Upload,
  ZoomIn,
  ZoomOut,
} from '../../../../assets/svg';
import styles from './style';
import Header from '../../../../components/Header';
import { images } from '../../../../assets/images';
import Button from '../../../../components/Button';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import AppColor from '../../../../helpers/AppColor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Config from 'react-native-config';

const Design = props => {
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY;
  return (
    <View style={styles.container}>
      <Header
        showBackIcon
        title={'Business Details'}
        navigation={props.navigation}
      />
      <KeyboardAvoidingView
        pointerEvents={props?.loading ? 'none' : 'auto'}
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <KeyboardAwareScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <TouchableOpacity style={styles.verified}>
                <Image
                  source={images.verified}
                  style={styles.cover}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.mainView}>
                <Text style={styles.subheading}>Company Logo</Text>
                <Text style={styles.subDescription}>
                  Add your profile picture which helps us to verified you.
                </Text>
                <View style={styles.logoContainer}>
                  <View style={styles.logoImageContainer}>
                    {props?.imageUploading ? (
                      <ActivityIndicator
                        size={'small'}
                        color={AppColor.textColor}
                      />
                    ) : props?.form?.businessLogo ? (
                      <Image
                        source={{ uri: props?.form?.businessLogo }}
                        style={styles.logoImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <EmptyImage
                        style={{
                          height: 27,
                          width: 24,
                        }}
                      />
                    )}
                  </View>

                  <View style={styles.uploadButtonContainer}>
                    <Button
                      text={'Upload Logo'}
                      color={'#2A2A2A'}
                      fontFamily={PopinsFont.regular}
                      fontSize={16}
                      lineHeight={Spacing.xl}
                      leftIcon={
                        <Upload
                          fill={'#2A2A2A'}
                          style={{ height: 20, width: 20 }}
                        />
                      }
                      backgroundColor={'#FFFFFF'}
                      borderColor={'#E1E1E1'}
                      borderWidth={1}
                      borderRadius={8}
                      height={40}
                      width={'60%'}
                      alignSelf={'flex-start'}
                      marginLeft={5}
                      marginBottom={9}
                      onPress={() => props.handleImagePick()}
                    />
                    <Text style={[styles.subDescription, { marginLeft: 5 }]}>
                      Recommended dimensions are 512 x 512 and 2MB file size
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.mainView}>
                <Text style={styles.subheading}>Business Location</Text>
                <Text style={styles.subDescription}>
                  Add the business information it help us to show you jobs near
                  you
                </Text>
                <View style={styles.autocompleteContainer}>
                  <GooglePlacesAutocomplete
                    ref={props.googleAddressRef}
                    placeholder="Enter your current business location"
                    onPress={(data, details = null) => {
                      props.handlePlaceSelect(data, details);
                    }}
                    query={{
                      key: GOOGLE_MAPS_API_KEY,
                      language: 'en',
                      components: 'country:us',
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    keyboardShouldPersistTaps={'handled'}
                    debounce={100}
                    enableHighAccuracyLocation
                    isRowScrollable={false}
                    GooglePlacesSearchQuery={{
                      rankby: 'distance',
                    }}
                    styles={{
                      textInput: styles.searchInput,
                      listView: styles.listView,
                      row: styles.row,
                      separator: styles.separator,
                    }}
                    textInputProps={{
                      placeholderTextColor: '#6A6A6A',
                      returnKeyType: 'search',
                    }}
                  />
                  <TouchableOpacity
                    style={styles.pinButton}
                    onPress={props.detectCurrentLocation}
                  >
                    <LocationIcon style={{ height: 25, width: 25 }} />
                  </TouchableOpacity>
                </View>
                <View style={styles.mapContainer}>
                  <MapView
                    ref={props.mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={props.region}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    showsCompass={false}
                  >
                    <Circle
                      center={props.markerCoordinate}
                      radius={2000}
                      strokeColor="rgba(0,122,255,0.4)"
                      fillColor="rgba(0,122,255,0.12)"
                    />

                    <Marker
                      coordinate={props.markerCoordinate}
                      anchor={{ x: 0.5, y: 0.5 }}
                    >
                      <PinLocationIcon style={{ height: 27, width: 20 }} />
                    </Marker>
                  </MapView>

                  <View style={styles.mapControls}>
                    <TouchableOpacity
                      style={[
                        styles.controlButton,
                        { borderBottomWidth: 1, borderBottomColor: '#C3C3C3' },
                      ]}
                      onPress={props.zoomIn}
                    >
                      <ZoomIn
                        style={{ width: 17, height: 17 }}
                        fill={'#2A2A2A'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={props.zoomOut}
                    >
                      <ZoomOut
                        style={{ width: 17, height: 3 }}
                        fill={'#2A2A2A'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.bottomView}>
                <Text style={styles.subheading}>Property name & Unit No.</Text>
                <Text style={styles.subDescription}>
                  Add the business information it help us to show you jobs near
                  you
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    value={props.form.businessEmail}
                    style={styles.textInput}
                    placeholder={'davisjohn@gmail.com'}
                    placeholderTextColor={'#6A6A6A'}
                    onChangeText={text => {
                      props.setForm(prev => ({
                        ...prev,
                        businessEmail: text,
                      }));
                    }}
                    cursorColor={AppColor.primaryBlue}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={props.form.businessPhone}
                    style={styles.textInput}
                    placeholder={'i.e. (123) 456 8861'}
                    placeholderTextColor={'#6A6A6A'}
                    onChangeText={text => {
                      props.setForm(prev => ({
                        ...prev,
                        businessPhone: text,
                      }));
                    }}
                    keyboardType="phone-pad"
                    cursorColor={AppColor.primaryBlue}
                  />
                </View>
                <Text style={styles.text}>
                  Choose the area you want to work.
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="i.e. 200 miles"
                    placeholderTextColor={'#6A6A6A'}
                    value={String(props?.form?.serviceRadiusMiles)}
                    onChangeText={text => {
                      props.setForm(prev => ({
                        ...prev,
                        serviceRadiusMiles: text,
                      }));
                    }}
                    keyboardType="number-pad"
                    cursorColor={AppColor.primaryBlue}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </KeyboardAvoidingView>
      {props.hasChanges && (
        <View style={styles.button}>
          <Button
            text={props.loading ? '' : 'Save Changes'}
            color={props.loading ? 'transparent' : '#FFFFFF'}
            fontFamily={PopinsFont.regular}
            fontSize={FontSizes.m}
            lineHeight={Spacing.xl}
            height={44}
            backgroundColor={'#009FD9'}
            width={'100%'}
            borderRadius={Spacing.s}
            onPress={() => props.handleStepAction()}
            rightIcon={
              props.loading ? (
                <ActivityIndicator size={'small'} color={AppColor.white} />
              ) : null
            }
          />
        </View>
      )}
    </View>
  );
};

export default Design;
