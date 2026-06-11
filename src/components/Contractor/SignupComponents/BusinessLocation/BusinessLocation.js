import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import {
  LocationIcon,
  PinLocationIcon,
  ZoomIn,
  ZoomOut,
} from '../../../../assets/svg';
import styles from './style';
import { showToast } from '../../../../helpers/ToastConfig';
import AppColor from '../../../../helpers/AppColor';
import Config from 'react-native-config';

const BusinessLocation = ({ props }) => {
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY;
  const mapRef = useRef(null);
  const googleAddressRef = useRef();
  useEffect(() => {
    detectCurrentLocation();
  }, []);
  const [region, setRegion] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 40.7128,
    longitude: -74.006,
  });
  const extractAddress = (components = []) => {
    const get = type =>
      components.find(c => c.types.includes(type))?.long_name || '';

    const streetNumber = get('street_number');
    const route = get('route');

    return {
      address: `${streetNumber} ${route}`.trim(),

      city: get('locality') || get('administrative_area_level_2') || '',

      state: get('administrative_area_level_1') || '',

      zipCode: get('postal_code') || '',
    };
  };

  const handlePlaceSelect = (data, details = null) => {
    if (!details) return;

    const { lat, lng } = details.geometry.location;

    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    // ✅ Directly extract (no smartAddressParse)
    const extracted = extractAddress(details.address_components);

    const formatted = details.formatted_address || '';

    const address = extracted.address || formatted.split(',')[0] || '';

    setRegion(newRegion);
    setMarkerCoordinate({ latitude: lat, longitude: lng });
    setTimeout(() => {
      mapRef.current?.animateToRegion(newRegion, 1000);
    }, 1500);

    googleAddressRef.current?.setAddressText(address);

    props.setForm(prev => ({
      ...prev,
      latitude: String(lat),
      longitude: String(lng),
      address,
      city: extracted.city,
      state: extracted.state,
      zipCode: extracted.zipCode,
    }));
  };

  // Zoom In handler
  const zoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  // Zoom Out handler
  const zoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);

    mapRef.current?.animateToRegion(newRegion, 300);
  };
  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
      );

      const data = await res.json();

      if (data.results?.length > 0) {
        const first = data.results[0];

        const extracted = extractAddress(first.address_components);

        return {
          address: extracted.address || first.formatted_address || '',
          city: extracted.city,
          state: extracted.state,
          zipCode: extracted.zipCode,
        };
      }
    } catch (err) {
      console.log('Geocode error', err);
    }

    return {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    };
  };
  const detectCurrentLocation = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        showToast('info', 'Permission denied! Location required.');
        return;
      }
    }

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        setRegion(newRegion);
        setMarkerCoordinate({ latitude, longitude });
        setTimeout(() => {
          mapRef.current?.animateToRegion(newRegion, 1000);
        }, 1500);

        // 🔥 Reverse Geocode
        const { address, city, state, zipCode } = await reverseGeocode(
          latitude,
          longitude,
        );
        googleAddressRef.current?.setAddressText(address);
        props.setForm(prev => ({
          ...prev,
          latitude: String(latitude),
          longitude: String(longitude),
          address,
          city,
          state,
          zipCode,
        }));
      },
      error => {
        showToast('error', 'Unable to fetch location');
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000 },
    );
  };
  // const onRegionChangeComplete = async newRegion => {
  //   setRegion(newRegion);

  //   const newCoord = {
  //     latitude: newRegion.latitude,
  //     longitude: newRegion.longitude,
  //   };

  //   setMarkerCoordinate(newCoord);

  //   // 🔥 Reverse geocode on drag end
  //   const { address, city, state, zipCode } = await reverseGeocode(
  //     newCoord.latitude,
  //     newCoord.longitude,
  //   );

  //   googleAddressRef.current?.setAddressText(address);

  //   props.setForm(prev => ({
  //     ...prev,
  //     latitude: String(newCoord.latitude),
  //     longitude: String(newCoord.longitude),
  //     address,
  //     city,
  //     state,
  //     zipCode,
  //   }));
  // };
  // const handleMapPress = async e => {
  //   const { latitude, longitude } = e.nativeEvent.coordinate;

  //   const newRegion = {
  //     latitude,
  //     longitude,
  //     latitudeDelta: region.latitudeDelta,
  //     longitudeDelta: region.longitudeDelta,
  //   };

  //   setRegion(newRegion);
  //   setMarkerCoordinate({ latitude, longitude });

  //   mapRef.current?.animateToRegion(newRegion, 300);

  //   // 🔥 Reverse geocode
  //   const { address, city, state, zipCode } = await reverseGeocode(
  //     latitude,
  //     longitude,
  //   );

  //   googleAddressRef.current?.setAddressText(address);

  //   props.setForm(prev => ({
  //     ...prev,
  //     latitude: String(latitude),
  //     longitude: String(longitude),
  //     address,
  //     city,
  //     state,
  //     zipCode,
  //   }));
  // };

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

        <View style={styles.mainView}>
          <Text style={styles.subheading}>Business Location</Text>
          <View style={styles.autocompleteContainer}>
            <GooglePlacesAutocomplete
              ref={googleAddressRef}
              placeholder="Enter your current business location"
              onPress={(data, details = null) => {
                handlePlaceSelect(data, details);
              }}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
                components: 'country:us', // was 'ae'
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
              onPress={detectCurrentLocation}
            >
              <LocationIcon style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={region}
              showsUserLocation={false}
              showsMyLocationButton={false}
              showsCompass={false}
              // onRegionChangeComplete={onRegionChangeComplete}
              // onPress={handleMapPress}
            >
              <Circle
                center={markerCoordinate}
                radius={2000}
                strokeColor="rgba(0,122,255,0.4)"
                fillColor="rgba(0,122,255,0.12)"
              />

              <Marker coordinate={markerCoordinate} anchor={{ x: 0.5, y: 0.5 }}>
                <PinLocationIcon style={{ height: 27, width: 20 }} />
              </Marker>
            </MapView>

            <View style={styles.mapControls}>
              <TouchableOpacity
                style={[
                  styles.controlButton,
                  { borderBottomWidth: 1, borderBottomColor: '#C3C3C3' },
                ]}
                onPress={zoomIn}
              >
                <ZoomIn style={{ width: 17, height: 17 }} fill="#6A6A6A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={zoomOut}>
                <ZoomOut style={{ width: 17, height: 3 }} fill="#6A6A6A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomView}>
          <Text style={styles.text}>
            Choose the area you want to work. (You can it later as well.)
          </Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              value={props.form.serviceRadiusMiles}
              placeholder="i.e. 200 miles"
              placeholderTextColor={'#6A6A6A'}
              onChangeText={text => {
                props.setForm(prev => ({
                  ...prev,
                  serviceRadiusMiles: text,
                }));
              }}
              keyboardType="number-pad"
              cursorColor={AppColor.primaryBlue}
            />
            <Text style={styles.miles}>miles</Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BusinessLocation;
