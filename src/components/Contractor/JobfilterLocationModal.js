import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Country, State, City } from 'country-state-city';

import ModalHeader from './ModalHeader';
import AppColor from '../../helpers/AppColor';
import CustomSlider from '../CustomSlider';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { PinLocationIcon, ZoomIn, ZoomOut } from '../../assets/svg';
import { Dropdown } from 'react-native-element-dropdown';
import Button from '../Button';
import Config from 'react-native-config';

const { width, height } = Dimensions.get('window');
const MAP_HEIGHT = height * 0.35;

const DEFAULT_REGION = {
  latitude: 40.7128,
  longitude: -74.006,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const JobFilterLocationModal = ({ visible, onClose, onApply }) => {
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY;
  const mapRef = useRef(null);

  // dropdown selected values
  const [countryValue, setCountryValue] = useState(null);
  const [stateValue, setStateValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);

  // text values
  const [zip, setZip] = useState('');
  const [miles, setMiles] = useState(100);

  // map states
  const [region, setRegion] = useState(DEFAULT_REGION);

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: DEFAULT_REGION.latitude,
    longitude: DEFAULT_REGION.longitude,
  });

  // -----------------------------
  // Countries
  // -----------------------------
  const countries = useMemo(() => {
    return Country.getAllCountries().map(item => ({
      label: item.name,
      value: item.isoCode,
      ...item,
    }));
  }, []);

  // -----------------------------
  // States
  // -----------------------------
  const states = useMemo(() => {
    if (!countryValue) {
      return [];
    }

    return State.getStatesOfCountry(countryValue).map(item => ({
      label: item.name,
      value: item.isoCode,
      ...item,
    }));
  }, [countryValue]);

  // -----------------------------
  // Cities
  // -----------------------------
  const cities = useMemo(() => {
    if (!countryValue || !stateValue) {
      return [];
    }

    return City.getCitiesOfState(countryValue, stateValue).map(item => ({
      label: item.name,
      value: item.name,
      ...item,
    }));
  }, [countryValue, stateValue]);

  // -----------------------------
  // Zoom In
  // -----------------------------
  const zoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  // -----------------------------
  // Zoom Out
  // -----------------------------
  const zoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  // -----------------------------
  // Get Coordinates From Address
  // -----------------------------
  const moveMapToLocation = async (countryName, stateName, cityName) => {
    try {
      const address = `${cityName}, ${stateName}, ${countryName}`;

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${GOOGLE_MAPS_API_KEY}`,
      );

      const data = await res.json();

      console.log('GOOGLE GEO DATA', data);

      if (
        data?.results &&
        Array.isArray(data.results) &&
        data.results.length > 0
      ) {
        const result = data.results[0];

        const location = result.geometry.location;

        const latitude = location.lat;
        const longitude = location.lng;

        // move map
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };

        setRegion(newRegion);

        setMarkerCoordinate({
          latitude,
          longitude,
        });

        mapRef.current?.animateToRegion(newRegion, 1000);

        // extract zip code
        const postalComponent = result.address_components.find(component =>
          component.types.includes('postal_code'),
        );

        if (postalComponent?.long_name) {
          setZip(postalComponent.long_name);
        } else {
          setZip('');
        }
      }
    } catch (error) {
      console.log('MAP LOCATION ERROR', error);
    }
  };
  const handleSave = () => {
    const selectedCountry = countries.find(item => item.value === countryValue);
    const selectedState = states.find(item => item.value === stateValue);
    const selectedCity = cities.find(item => item.value === cityValue);
    onApply({
      country: selectedCountry?.label,
      state: selectedState?.label,
      city: selectedCity?.label,
      zip,
      miles,
      latitude: markerCoordinate.latitude,
      longitude: markerCoordinate.longitude,
    });

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Select Area'} onPress={() => onClose()} />

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Country */}
            <View style={[styles.areaField, { zIndex: 3000 }]}>
              <Text style={styles.areaLabel}>Country</Text>

              <View style={styles.dropDowncontainer}>
                <Dropdown
                  style={styles.dropdown}
                  mode="modal"
                  containerStyle={styles.dropdownContainerStyle}
                  itemContainerStyle={styles.itemContainerStyle}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={countries}
                  maxHeight={300}
                  search
                  labelField="label"
                  valueField="value"
                  placeholder="Select Country"
                  value={countryValue}
                  onChange={item => {
                    setCountryValue(item.value);

                    // reset state + city
                    setStateValue(null);
                    setCityValue(null);
                    setZip('');
                  }}
                />
              </View>
            </View>

            {/* State */}
            <View style={[styles.areaField, { zIndex: 3000 }]}>
              <Text style={styles.areaLabel}>State</Text>

              <View style={styles.dropDowncontainer}>
                <Dropdown
                  mode="modal"
                  disable={!countryValue}
                  containerStyle={styles.dropdownContainerStyle}
                  itemContainerStyle={styles.itemContainerStyle}
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={states}
                  maxHeight={300}
                  search
                  labelField="label"
                  valueField="value"
                  placeholder="Select State"
                  value={stateValue}
                  onChange={item => {
                    setStateValue(item.value);

                    // reset city
                    setCityValue(null);
                    setZip('');
                  }}
                />
              </View>
            </View>

            {/* City */}
            <View style={styles.rowFields}>
              <View
                style={[
                  styles.areaField,
                  { flex: 1, marginRight: 8, zIndex: 3000 },
                ]}
              >
                <Text style={styles.areaLabel}>City</Text>

                <View style={styles.dropDowncontainer}>
                  <Dropdown
                    mode="modal"
                    disable={!stateValue}
                    containerStyle={styles.dropdownContainerStyle}
                    itemContainerStyle={styles.itemContainerStyle}
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={cities}
                    maxHeight={300}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder="Select City"
                    value={cityValue}
                    onChange={async item => {
                      setCityValue(item.value);

                      const selectedCountry = countries.find(
                        country => country.value === countryValue,
                      );

                      const selectedState = states.find(
                        state => state.value === stateValue,
                      );

                      await moveMapToLocation(
                        selectedCountry?.label,
                        selectedState?.label,
                        item.label,
                      );
                    }}
                  />
                </View>
              </View>

              {/* Zip */}
              <View style={[styles.areaField, { flex: 1 }]}>
                <Text style={styles.areaLabel}>Zip Code</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Zip code"
                  value={zip}
                  onChangeText={setZip}
                  keyboardType="numeric"
                  placeholderTextColor={'#6A6A6A'}
                  cursorColor={AppColor.primaryBlue}
                />
              </View>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>
              <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                showsUserLocation={false}
                showsMyLocationButton={false}
                showsCompass={false}
              >
                <Marker
                  coordinate={markerCoordinate}
                  anchor={{ x: 0.5, y: 0.5 }}
                >
                  <View style={styles.markerWrapper}>
                    <View style={styles.outerCircle}>
                      <PinLocationIcon
                        style={{ height: 30, width: 30 }}
                        fill={'#009FD9'}
                      />
                    </View>
                  </View>
                </Marker>
              </MapView>

              <View style={styles.mapControls}>
                <TouchableOpacity
                  style={[
                    styles.controlButton,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: '#C3C3C3',
                    },
                  ]}
                  onPress={zoomIn}
                >
                  <ZoomIn style={{ width: 17, height: 17 }} fill="#6A6A6A" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={zoomOut}
                >
                  <ZoomOut style={{ width: 17, height: 3 }} fill="#6A6A6A" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Radius */}
            <View style={styles.topBox}>
              <View style={styles.row}>
                <View style={styles.budgetView}>
                  <Text style={styles.areaLabel}>Select Area Radius</Text>
                </View>

                <View style={styles.budgetInputContainer}>
                  <Text style={styles.budgetValue}>{miles} mi</Text>
                </View>
              </View>

              <CustomSlider
                min={20}
                max={1000}
                step={1}
                initialValue={miles}
                onValueChange={value => setMiles(value)}
                filledColor={'#009FD9'}
                unfilledColor={'#F1F1F1'}
              />
            </View>

            {/* Button */}
            <View style={styles.areaButtons}>
              {/* <Button
                text={'View Preferences'}
                color={'#2A2A2A'}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                backgroundColor={'#F7F7F7'}
                borderColor={'#E1E1E1'}
                borderWidth={1}
                width={'49%'}
                height={Spacing.xl6}
                borderRadius={Spacing.s}
              /> */}
              <Button
                text={'Save Area'}
                onPress={handleSave}
                color={'#FFFFFF'}
                fontFamily={PopinsFont.regular}
                fontSize={FontSizes.m}
                backgroundColor={'#009FD9'}
                width={'100%'}
                height={Spacing.xl6}
                borderRadius={Spacing.s}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColor.popUpBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    width: '100%',
    maxHeight: '90%',
  },

  areaField: {
    marginVertical: 5,
  },
  areaLabel: {
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    color: '#6A6A6A',
    lineHeight: Spacing.l,
    paddingVertical: 5,
  },

  textInput: {
    backgroundColor: '#F1F1F1',
    borderRadius: Spacing.s,
    padding: Spacing.s,
    height: Spacing.xl6,
    fontSize: FontSizes.m,
    color: '#6A6A6A',
  },
  rowFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapContainer: {
    marginVertical: 16,
    backgroundColor: '#E9ECEF',
    borderRadius: 16,
    padding: 12,
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  mapLabelContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 4,
    borderWidth: 0.5,
    borderColor: '#CCC',
  },
  mapLabel: {
    fontSize: 10,
    color: '#333',
  },
  areaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  mapContainer: {
    height: MAP_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 10,
    marginBottom: 2,
    height: 200,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapControls: {
    position: 'absolute',
    right: 12,
    top: 12,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 120,
    width: 40,
    justifyContent: 'center',
  },

  controlButton: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topBox: {
    backgroundColor: '#FFF',
    // padding: Spacing.s,
    borderRadius: Spacing.s,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  budgetView: { alignSelf: 'flex-start' },
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: Spacing.s,
    borderRadius: Spacing.s,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    height: Spacing.xl4,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: 28,
  },

  budgetValue: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
  },
  markerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#009FD91A',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#009FD9',
    borderWidth: 1,
    alignSelf: 'center',
  },
  //   dropdown
  dropDowncontainer: {
    backgroundColor: '#FFF',
    width: '100%',
    zIndex: 3000,
  },
  dropdown: {
    height: Spacing.xl6,
    borderRadius: Spacing.s,
    padding: Spacing.s,
    backgroundColor: '#F1F1F1',
    width: '100%',
  },
  placeholderStyle: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },
  selectedTextStyle: {
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
  },
  iconStyle: {
    width: 30,
    height: 30,
    tintColor: '#2A2A2A',
  },
  dropdownContainerStyle: {
    borderRadius: 12,
    marginTop: 2,
  },

  itemContainerStyle: {
    borderRadius: 8,
  },
});
export default JobFilterLocationModal;
