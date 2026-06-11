import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { PopinsFont } from '../../helpers/Fonts';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import AppColor from '../../helpers/AppColor';
import ModalHeader from './ModalHeader';
import CustomSwitch from '../CustomSwitch';
import { CheckBox, RejectIcon } from '../../assets/svg';
import Button from '../Button';

const MemberQucikActionModal = ({ visible, onClose, openModal }) => {
  const [disableMemeber, setDisableMember] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay} activeOpacity={1}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Quick Actions'} onPress={() => onClose()} />

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.view1}>
              <Text style={styles.disableText}>Disable Member</Text>
              <CustomSwitch
                value={disableMemeber}
                onValueChange={value => setDisableMember(value)}
              />
            </View>
            <TouchableOpacity
              onPress={() => setActive(!active)}
              style={[
                styles.touch,
                {
                  backgroundColor: active ? '#009FD9' : '#F7F7F7',
                  borderColor: active ? '#009FD9' : '#E1E1E1',
                },
              ]}
            >
              <View style={styles.innerView}>
                <CheckBox
                  style={styles.icon}
                  fill={active ? '#FFF' : '#C3C3C3'}
                />
                <Text
                  style={[
                    styles.innerText,
                    { color: active ? '#FFF' : '#151515' },
                  ]}
                >
                  Set as active after 24 hours
                </Text>
              </View>
            </TouchableOpacity>
            <Button
              text={'Remove From Team'}
              color={'#CC2D30'}
              fontFamily={PopinsFont.regular}
              fontSize={FontSizes.m}
              lineHeight={Spacing.xl}
              backgroundColor={'#FFECEC'}
              borderColor={'#FFD7D8'}
              borderWidth={1}
              height={44}
              borderRadius={12}
              width={'100%'}
              leftIcon={<RejectIcon style={styles.icon} fill={'#CC2D30'} />}
              onPress={() => openModal('member_remove_from_team_modal')}
            />
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
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  disableText: {
    color: '#151515',
    fontFamily: PopinsFont.medium,
    fontSize: FontSizes.m,
    lineHeight: Spacing.l,
    textAlign: 'left',
  },
  touch: {
    borderWidth: 1,
    paddingHorizontal: Spacing.s,
    borderRadius: Spacing.s,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 12,
  },
  innerView: {
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center',
    gap: 10,
  },
  innerText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
    textAlign: 'left',
  },
  icon: { height: 20, width: 20 },
});

export default MemberQucikActionModal;
