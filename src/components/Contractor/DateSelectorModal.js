import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Spacing, FontSizes } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import AppColor from '../../helpers/AppColor';
import {
  CalenderLeft,
  CalenderRight,
  CheckBox,
  GenerateReportIcon,
} from '../../assets/svg';
import ModalHeader from './ModalHeader';
import Button from '../Button';

const getDateRange = option => {
  const today = moment();
  let start, end;

  switch (option) {
    case 'Today':
      start = today.clone().startOf('day');
      end = today.clone().endOf('day');
      break;
    case 'Last 7 Days':
      start = today.clone().subtract(7, 'days').startOf('day');
      end = today.clone().endOf('day');
      break;
    case 'Last 30 Days':
      start = today.clone().subtract(30, 'days').startOf('day');
      end = today.clone().endOf('day');
      break;
    case 'Last 3 Months':
      start = today.clone().subtract(3, 'months').startOf('day');
      end = today.clone().endOf('day');
      break;
    default:
      return null;
  }
  return {
    from: start.format('YYYY-MM-DD'),
    to: end.format('YYYY-MM-DD'),
    label: option,
  };
};

const DateSelectorModal = ({ visible, onClose, onSelect, type }) => {
  const fileOptions = [
    { label: 'Excel', value: 'excel' },
    { label: 'PDF', value: 'pdf' },
    { label: 'CSV', value: 'csv' },
  ];
  const [fileType, setFileType] = useState(fileOptions[0].value);
  const [selectedOption, setSelectedOption] = useState(null);
  const [customRange, setCustomRange] = useState({ start: null, end: null });
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  // Store the final selected range (predefined or custom)
  const [selectedRange, setSelectedRange] = useState(null);

  // Handle predefined option press – store range & close calendar, but do NOT call onSelect yet
  const handleOptionPress = option => {
    setSelectedOption(option);
    if (option !== 'Custom') {
      const range = getDateRange(option);
      setSelectedRange(range); // store range
      setCalendarVisible(false);
      // For non‑finance modals, you might still want immediate callback
      if (type !== 'finance') {
        onSelect(range);
        onClose();
      }
    } else {
      setCalendarVisible(true);
      setSelectedRange(null); // custom range will be set later
      setCustomRange({ start: null, end: null });
      setMarkedDates({});
    }
  };

  // Calendar day selection logic
  const onDayPress = day => {
    const date = day.dateString;
    let start = customRange.start;
    let end = customRange.end;

    if (!start) {
      start = date;
      end = null;
    } else if (!end) {
      if (moment(date).isBefore(start)) {
        end = start;
        start = date;
      } else {
        end = date;
      }
    } else {
      start = date;
      end = null;
    }

    setCustomRange({ start, end });
    updateMarkedDates(start, end);

    // When both start and end are set, store the range immediately
    if (start && end) {
      setSelectedRange({
        from: moment(start).format('YYYY-MM-DD'),
        to: moment(end).format('YYYY-MM-DD'),
        label: 'Custom',
      });
    } else {
      setSelectedRange(null);
    }
  };

  const updateMarkedDates = (start, end) => {
    const marks = {};
    if (start) {
      marks[start] = {
        startingDay: true,
        color: '#009FD9',
        textColor: '#ffffff',
      };
    }
    if (end && end !== start) {
      marks[end] = {
        endingDay: true,
        color: '#009FD9',
        textColor: '#ffffff',
      };
    }
    if (start && end && start !== end) {
      let current = moment(start).add(1, 'day');
      const endMoment = moment(end).subtract(1, 'day');
      while (current <= endMoment) {
        marks[current.format('YYYY-MM-DD')] = {
          selected: true,
          color: '#CCECF7',
          textColor: '#2A2A2A',
        };
        current.add(1, 'day');
      }
    }
    setMarkedDates(marks);
  };

  const handleGenerateReport = () => {
    if (!selectedRange) {
      return;
    }
    onSelect(selectedRange, fileType);
    onClose();
  };

  // Just close without generating (used by header close)
  const handleClose = () => {
    onClose();
  };
  const applyCustomRange = () => {
    if (customRange.start && customRange.end) {
      onSelect({
        from: moment(customRange.start).format('YYYY-MM-DD'),
        to: moment(customRange.end).format('YYYY-MM-DD'),
        label: selectedOption,
      });
    }
    onClose();
  };
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader
            title={type === 'finance' ? 'Generate Report' : 'Date Selector'}
            onPress={handleClose} // close without action
          />

          {type === 'finance' && (
            <View style={{ margin: 12 }}>
              <Text style={styles.choose}>Choose File Type</Text>
              <View style={styles.dropDowncontainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={fileOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Excel"
                  value={fileType}
                  onChange={item => setFileType(item.value)}
                />
              </View>
            </View>
          )}

          <View style={styles.optionsRow}>
            {[
              'Today',
              'Last 7 Days',
              'Last 30 Days',
              'Last 3 Months',
              'Custom',
            ].map(opt => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.optionButton,
                  selectedOption === opt && styles.selectedOption,
                ]}
                onPress={() => handleOptionPress(opt)}
              >
                <CheckBox
                  style={{ height: 22, width: 22 }}
                  fill={selectedOption === opt ? '#FFFFFF' : '#C3C3C3'}
                />
                <Text
                  style={[
                    styles.optionText,
                    selectedOption === opt && styles.selectedOptionText,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {calendarVisible && (
            <Calendar
              current={moment().format('YYYY-MM-DD')}
              markingType="period"
              markedDates={markedDates}
              onDayPress={onDayPress}
              theme={{
                calendarBackground: '#F7F7F7',
                textSectionTitleColor: '#666',
                selectedDayBackgroundColor: '#009FD9',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#2A2A2A',
                todayBackgroundColor: '#FFBB7E',
                dayTextColor: '#2A2A2A',
                textDisabledColor: '#d9e1e8',
                dotColor: '#009FD9',
                selectedDotColor: '#FFFFFF',
                arrowColor: '#009FD9',
                monthTextColor: '#2A2A2A',
                textDayFontFamily: PopinsFont.regular,
                textMonthFontFamily: PopinsFont.medium,
                textDayHeaderFontFamily: PopinsFont.regular,
                textDayFontSize: FontSizes.s,
                textMonthFontSize: FontSizes.xl,
                textDayHeaderFontSize: FontSizes.s,
              }}
              style={styles.calendar}
              renderArrow={direction => (
                <View style={styles.arrowContainer}>
                  {direction === 'left' ? (
                    <CalenderLeft style={{ height: 44, width: 44 }} />
                  ) : (
                    <CalenderRight style={{ height: 44, width: 44 }} />
                  )}
                </View>
              )}
            />
          )}

          {type === 'finance' && (
            <Button
              text="Generate Report"
              color="#FFFFFF"
              fontFamily={PopinsFont.regular}
              fontSize={FontSizes.s}
              lineHeight={Spacing.xl}
              height={44}
              backgroundColor="#009FD9"
              borderWidth={1}
              borderColor="#009FD9"
              width="95%"
              borderRadius={Spacing.s}
              leftIcon={
                <GenerateReportIcon style={styles.sideIcon} fill="#FFFFFF" />
              }
              iconSpacing={8}
              onPress={handleGenerateReport}
              marginTop={10}
            />
          )}
          {type !== 'finance' && selectedOption === 'Custom' && (
            <Button
              text="Apply"
              color="#FFFFFF"
              fontFamily={PopinsFont.regular}
              fontSize={FontSizes.s}
              lineHeight={Spacing.xl}
              height={44}
              backgroundColor="#009FD9"
              borderWidth={1}
              borderColor="#009FD9"
              width="95%"
              borderRadius={Spacing.s}
              leftIcon={
                <GenerateReportIcon style={styles.sideIcon} fill="#FFFFFF" />
              }
              iconSpacing={8}
              onPress={() => applyCustomRange()}
              marginTop={10}
            />
          )}
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
    maxHeight: '90%',
    paddingVertical: 15,
    width: '100%',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 10,
    paddingHorizontal: 10,
  },
  optionButton: {
    backgroundColor: '#F7F7F7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: FontSizes.s,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    gap: 10,
  },
  selectedOption: {
    backgroundColor: '#009FD9',
    borderWidth: 1,
    borderColor: '#009FD9',
  },
  optionText: {
    fontSize: FontSizes.m,
    fontFamily: PopinsFont.regular,
    color: '#151515',
    lineHeight: FontSizes.xl,
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  calendar: {
    marginTop: 16,
    borderRadius: 8,
  },
  sideIcon: { height: 15, width: 15 },
  dropDowncontainer: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    width: '100%',
  },
  dropdown: {
    height: 44,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    borderRadius: Spacing.s,
    paddingHorizontal: 8,
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
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  choose: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },
  arrowContainer: {
    height: 44,
    width: 44,
    borderRadius: FontSizes.m,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default DateSelectorModal;
