import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { PopinsFont } from '../helpers/Fonts';
import AppColor from '../helpers/AppColor';

const CustomCalendar = ({
  visible,
  onClose,
  onSelectDate,
  selectedDate,
  type,
}) => {
  const [date, setDate] = useState(selectedDate);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const today = new Date().toISOString().split('T')[0];

  const handleDayPress = day => {
    const selected = day.dateString;
    setDate(selected);
    onSelectDate(selected);
    onClose();
  };

  const handleConfirm = () => {
    onSelectDate(date);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.calendarContainer}>
          <Calendar
            current={date || undefined}
            minDate={type === 'bids' ? today : '1940-01-01'}
            maxDate={'2100-12-31'}
            onDayPress={handleDayPress}
            markedDates={
              date
                ? {
                    [date]: {
                      selected: true,
                      marked: true,
                      selectedColor: '#00538F',
                    },
                  }
                : {}
            }
            theme={{
              todayTextColor: '#00538F',
              selectedDayBackgroundColor: '#00538F',
              selectedDayTextColor: '#FFFFFF',
              arrowColor: '#00538F',
            }}
          />

          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.actionText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    padding: 10,
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  actionText: {
    color: AppColor.primaryBlue,
    fontFamily: PopinsFont.semiBold,
    fontSize: 14,
  },
});
export default CustomCalendar;
