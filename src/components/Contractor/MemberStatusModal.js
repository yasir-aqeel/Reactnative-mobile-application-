import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import AppColor from '../../helpers/AppColor';
import ModalHeader from './ModalHeader';
import { memberStatuses } from '../../helpers/Data';

const MemberStatusModal = ({ visible, onClose }) => {
  const [memberStatus, setMemberStatus] = useState(memberStatuses[0]);

  const handleSelect = item => {
    setMemberStatus(item);
    onClose();
  };
  const renderItem = ({ item }) => {
    const isSelected = item.id === memberStatus.id;
    return (
      <TouchableOpacity
        style={[
          styles.statusItem,
          {
            backgroundColor: isSelected ? '#E6F6FC' : '#FFF',
          },
        ]}
        onPress={() => handleSelect(item)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View
            style={{
              height: 11,
              width: 11,
              borderRadius: 10,
              backgroundColor: item.dotColor,
            }}
          />

          <Text style={[styles.statusText, isSelected && styles.selectedText]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay} activeOpacity={1}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Status'} onPress={() => onClose()} />
          <View style={{ paddingHorizontal: 10 }}>
            <FlatList
              data={memberStatuses}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>
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
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: PopinsFont.medium,
    color: '#2A2A2A',
  },
  list: {
    paddingBottom: 10,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Spacing.s,
    height: 44,
  },
  statusText: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
    lineHeight: Spacing.xl,
  },
  selectedText: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#2A2A2A',
    lineHeight: Spacing.xl,
  },
});

export default MemberStatusModal;
