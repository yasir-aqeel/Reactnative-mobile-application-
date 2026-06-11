import React from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import styles from './style';
import Header from '../../../../components/Header';
const Design = props => {
  return (
    <View style={styles.container}>
      <Header
        showBackIcon
        title={'Notifications'}
        navigation={props.navigation}
      />
      <View style={styles.infoContainer}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={styles.nameContainer}>
            <FlatList
              data={props.data}
              keyExtractor={item => item.id}
              renderItem={props.renderSettings}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Design;
