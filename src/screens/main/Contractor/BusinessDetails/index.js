import React, { useState, useRef, useEffect } from 'react';
import isEqual from 'lodash.isequal';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Design from './Design';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteImage,
  hasInternet,
  uploadImage,
} from '../../../../helpers/services';
import { showToast } from '../../../../helpers/ToastConfig';
import { usePicker } from '../../../../helpers/usePicker';
import {
  acceptTermsConditions,
  createProfile,
  onBoardUser,
} from '../../../../redux/actions/authActions';
import Config from 'react-native-config';

const BusinessDetails = ({ navigation }) => {
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY;
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const googleAddressRef = useRef();
  const userID = userData?.user.id;
  const user = userData?.user?.contractorProfile;

  const [region, setRegion] = useState({
    latitude: user.latitude,
    longitude: user.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: user.latitude,
    longitude: user.longitude,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [image, setImage] = useState();
  const openImagePicker = usePicker('image', setImage, false);
  useEffect(() => {
    googleAddressRef.current?.setAddressText(user.address);
  }, []);
  const [form, setForm] = useState({
    businessName: user.businessName,
    businessEmail: user.businessEmail,
    businessPhone: user.businessPhone,
    businessLogo: user.businessLogo,
    serviceRadiusMiles: user.serviceRadiusMiles,
    serviceArea: user.serviceArea,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    latitude: user.latitude,
    longitude: user.longitude,
  });
  const initialData = {
    businessName: user.businessName,
    businessEmail: user.businessEmail,
    businessPhone: user.businessPhone,
    businessLogo: user.businessLogo,
    serviceRadiusMiles: user.serviceRadiusMiles,
    serviceArea: user.serviceArea,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    latitude: user.latitude,
    longitude: user.longitude,
  };
  const normalizeForm = {
    ...form,
    serviceRadiusMiles: form.serviceRadiusMiles
      ? String(form.serviceRadiusMiles)
      : '',
    latitude: form.latitude ? String(form.latitude) : '',
    longitude: form.longitude ? String(form.longitude) : '',
  };
  const normalizedInitialData = {
    ...initialData,
    serviceRadiusMiles: initialData.serviceRadiusMiles
      ? String(initialData.serviceRadiusMiles)
      : '',
    latitude: initialData.latitude ? String(initialData.latitude) : '',
    longitude: initialData.longitude ? String(initialData.longitude) : '',
  };
  const hasChanges = !isEqual(normalizeForm, normalizedInitialData);

  const handleImagePick = async () => {
    try {
      const res = await openImagePicker();
      if (!res || !Array.isArray(res) || res.length === 0) {
        return;
      }
      const finalSelectedImage = res[0];
      if (!finalSelectedImage) return;

      const internetStatus = await hasInternet();

      if (!internetStatus) {
        showToast('info', 'No Internet Connection');
        return;
      }
      if (form.businessLogo) {
        await deleteImage(form.businessLogo);
      }
      setImageUploading(true);
      console.log(finalSelectedImage);
      const uploadRes = await uploadImage(finalSelectedImage);

      if (uploadRes?.url) {
        setForm(prev => ({
          ...prev,
          businessLogo: uploadRes?.url,
        }));
      }
      setImageUploading(false);
    } catch (err) {
      console.log('Image pick error:', err);
    }
  };
  const buildProfilePayload = userId => {
    const common = {
      userId,
      address: form.address,
      city: form.city,
      state: form.state,
      zipCode: form.zipCode,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    return {
      ...common,
      businessName: form.businessName.trim(),
      businessEmail: form.businessEmail,
      businessPhone: form.businessPhone,
      businessLogo: form.businessLogo,
    };
  };

  const handleStepAction = async () => {
    const internetStatus = await hasInternet();

    if (!internetStatus) {
      showToast('info', 'No Internet Connection');
      return;
    }
    setLoading(true);
    try {
      const termsRes = await dispatch(
        acceptTermsConditions({
          userId: userID,
          agreedToTerms: true,
        }),
      );

      if (termsRes.statusCode !== 200) {
        showToast('error', termsRes.message);
        return;
      }
      const businessProfile = buildProfilePayload(userID);
      const profileRes = await dispatch(createProfile(businessProfile));

      if (profileRes.statusCode !== 200) {
        showToast('error', profileRes.message);
        return;
      }

      const onboardRes = await dispatch(onBoardUser({ userId: userID }));

      showToast('success', profileRes.message);
      navigation.goBack();
      return;
    } catch (error) {
      console.log(error);
      showToast('error', error.message);
    } finally {
      setLoading(false);
    }
  };
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

    setForm(prev => ({
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
        setForm(prev => ({
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

  return (
    <Design
      navigation={navigation}
      loading={loading}
      region={region}
      setRegion={setRegion}
      markerCoordinate={markerCoordinate}
      setMarkerCoordinate={setMarkerCoordinate}
      mapRef={mapRef}
      handlePlaceSelect={handlePlaceSelect}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      detectCurrentLocation={detectCurrentLocation}
      googleAddressRef={googleAddressRef}
      form={form}
      setForm={setForm}
      handleImagePick={handleImagePick}
      imageUploading={imageUploading}
      handleStepAction={handleStepAction}
      hasChanges={hasChanges}
    />
  );
};

export default BusinessDetails;
