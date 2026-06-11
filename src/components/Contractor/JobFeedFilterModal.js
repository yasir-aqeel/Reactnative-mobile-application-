import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import ModalHeader from './ModalHeader';
import CustomSlider from '../CustomSlider';
import AppColor from '../../helpers/AppColor';
import { FontSizes, Spacing } from '../../helpers/sizeHelper';
import { PopinsFont } from '../../helpers/Fonts';
import { CheckBox } from '../../assets/svg';
import Button from '../Button';
const JobFeedFilterModal = ({ visible, onClose, onApply }) => {
  const [metrics, setMetrics] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [sort, setSort] = useState([]);
  const [service, setService] = useState([]);
  const [budget, setBudget] = useState(200);
  const MIN_BUDGET = 10;
  const MAX_BUDGET = 500;

  const toggleSelection = useCallback((id, setState) => {
    setState(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  }, []);
  const toggleJobType = id => toggleSelection(id, setJobTypes);
  const toggleMetrics = id => toggleSelection(id, setMetrics);
  const toggleSort = id => toggleSelection(id, setSort);
  const toggleTopServices = id => toggleSelection(id, setService);
  const handleApply = () => {
    onApply({
      minBudget: MIN_BUDGET,
      maxBudget: budget,
      jobTypes,
      sort,
      service,
      metrics,
    });

    onClose();
  };

  const merticsOptions = [
    {
      name: 'Highest Paid',
      id: 'highestPaid',
    },
    {
      name: 'Highest No. of Jobs',
      id: 'highestJobs',
    },
  ];
  const jobTypesOptions = [
    {
      name: 'Fixed',
      id: 'Fixed',
    },
    {
      name: 'T&M',
      id: 'T_AND_M',
    },
  ];
  const sortOptions = [
    { name: 'Recently added', id: 'recent' },
    { name: 'Best Match', id: 'bestMatch' },
  ];
  const topServices = [
    {
      name: 'Cleaning',
      count: 20,
      id: 'cleaning',
    },
    {
      name: 'Roofing',
      count: 22,
      id: 'roofing',
    },
    {
      name: 'Electrician',
      count: 32,
      id: 'electrician',
    },
    {
      name: 'Plumber',
      count: 12,
      id: 'plumber',
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ModalHeader title={'Filtes'} onPress={() => onClose()} />

          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.topBox}>
              <View style={styles.row}>
                <View style={styles.budgetView}>
                  <Text style={styles.filterLabel}>
                    Budget <Text style={styles.upTo}>up-to</Text>
                  </Text>
                </View>
                <View style={styles.budgetInputContainer}>
                  <Text style={styles.dollarSign}>
                    $ <Text style={styles.budgetValue}> {budget}</Text>
                  </Text>
                </View>
              </View>

              <CustomSlider
                min={MIN_BUDGET}
                max={MAX_BUDGET}
                step={1}
                initialValue={budget}
                onValueChange={value => setBudget(value)}
                filledColor={'#009FD9'}
                unfilledColor={'#FFFFFF'}
              />
            </View>

            {/* Metrics */}
            <View style={styles.filterSection}>
              <Text style={styles.label}>Metrics</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sectionRow}
              >
                {merticsOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.selectedValue,
                      {
                        backgroundColor: metrics.includes(option.id)
                          ? '#009FD9'
                          : '#F7F7F7',
                        borderColor: metrics.includes(option.id)
                          ? '#009FD9'
                          : '#E1E1E1',
                      },
                    ]}
                    onPress={() => toggleMetrics(option.id)}
                  >
                    <CheckBox
                      style={styles.checkBox}
                      fill={metrics.includes(option.id) ? '#FFFFFF' : '#C3C3C3'}
                    />
                    <Text
                      style={[
                        styles.selectedText,
                        {
                          color: metrics.includes(option.id)
                            ? '#FFFFFF'
                            : '#151515',
                        },
                      ]}
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.label}>Job Type</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sectionRow}
              >
                {jobTypesOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.selectedValue,
                      {
                        backgroundColor: jobTypes.includes(option.id)
                          ? '#009FD9'
                          : '#F7F7F7',
                        borderColor: jobTypes.includes(option.id)
                          ? '#009FD9'
                          : '#E1E1E1',
                      },
                    ]}
                    onPress={() => toggleJobType(option.id)}
                  >
                    <CheckBox
                      style={styles.checkBox}
                      fill={
                        jobTypes.includes(option.id) ? '#FFFFFF' : '#C3C3C3'
                      }
                    />
                    <Text
                      style={[
                        styles.selectedText,
                        {
                          color: jobTypes.includes(option.id)
                            ? '#FFFFFF'
                            : '#151515',
                        },
                      ]}
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.label}>Sort</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sectionRow}
              >
                {sortOptions.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.selectedValue,
                      {
                        backgroundColor: sort.includes(option.id)
                          ? '#009FD9'
                          : '#F7F7F7',
                        borderColor: sort.includes(option.id)
                          ? '#009FD9'
                          : '#E1E1E1',
                      },
                    ]}
                    onPress={() => toggleSort(option.id)}
                  >
                    <CheckBox
                      style={styles.checkBox}
                      fill={sort.includes(option.id) ? '#FFFFFF' : '#C3C3C3'}
                    />
                    <Text
                      style={[
                        styles.selectedText,
                        {
                          color: sort.includes(option.id)
                            ? '#FFFFFF'
                            : '#151515',
                        },
                      ]}
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.label}>Top Services</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sectionRow}
              >
                {topServices.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.selectedValue,
                      {
                        backgroundColor: service.includes(option.id)
                          ? '#009FD9'
                          : '#F7F7F7',
                        borderColor: service.includes(option.id)
                          ? '#009FD9'
                          : '#E1E1E1',
                      },
                    ]}
                    onPress={() => toggleTopServices(option.id)}
                  >
                    <CheckBox
                      style={styles.checkBox}
                      fill={service.includes(option.id) ? '#FFFFFF' : '#C3C3C3'}
                    />
                    <Text
                      style={[
                        styles.selectedText,
                        {
                          color: service.includes(option.id)
                            ? '#FFFFFF'
                            : '#151515',
                        },
                      ]}
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <Button
              text={'Apply'}
              onPress={handleApply}
              color={'#FFFFFF'}
              fontFamily={PopinsFont.regular}
              fontSize={FontSizes.m}
              backgroundColor={'#009FD9'}
              width={'100%'}
              height={Spacing.xl6}
              borderRadius={Spacing.s}
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
    maxHeight: '90%',
    paddingVertical: 15,
    width: '100%',
  },

  filterSection: {
    marginVertical: 12,
  },
  filterLabel: {
    color: '#2A2A2A',
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  upTo: {
    color: '#007FAE',
    fontSize: FontSizes.s,
    fontFamily: PopinsFont.regular,
    lineHeight: Spacing.l,
  },
  topBox: {
    backgroundColor: '#F1F1F1',
    padding: Spacing.s,
    borderRadius: Spacing.s,
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.s,
    borderRadius: Spacing.s,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    height: Spacing.xl4,
  },
  dollarSign: {
    color: '#2A2A2A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.l,
    lineHeight: Spacing.l,
  },
  budgetValue: {
    color: '#A6A6A6',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.l,
    lineHeight: Spacing.l,
  },
  label: {
    color: '#6A6A6A',
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.s,
    lineHeight: Spacing.l,
  },

  contentContainerStyle: { paddingHorizontal: 10 },
  checkBox: { height: 18, width: 18 },
  sectionRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },
  selectedValue: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.s,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.s,
    gap: 5,
    borderWidth: 1,
  },
  selectedText: {
    fontFamily: PopinsFont.regular,
    fontSize: FontSizes.m,
    lineHeight: Spacing.xl,
  },
});
export default JobFeedFilterModal;
