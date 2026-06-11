import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './style';
import {
  CheckBox,
  DeleteIcon,
  GenerateReportIcon,
  LinkedAccountIcon,
  PlusIcon,
} from '../../../../assets/svg';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import { getStatusLabel } from '../../../../helpers/Data';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';

const Design = props => {
  return (
    <View style={styles.container}>
      <Header
        showBackIcon
        title={'Linked Bank Account'}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.infoContainer}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <View style={styles.topArray}>
            {props.topScreens.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => props.handleSelectBank(item.id)}
                  key={item.id}
                  style={styles.optionRow}
                >
                  <View style={styles.innerRow}>
                    <View style={styles.iconRow}>
                      <CheckBox
                        style={styles.leftIcon}
                        fill={
                          props.selectedBank === item.id ? '#009FD9' : '#C3C3C3'
                        }
                      />
                      <View
                        style={
                          props.selectedBank === item.id
                            ? styles.bankIconContainer
                            : styles.bankIconNotSelectedContainer
                        }
                      >
                        <LinkedAccountIcon
                          style={styles.leftIcon}
                          fill={'#184C35'}
                        />
                      </View>
                    </View>

                    <Text style={styles.name}>{item.name}</Text>
                  </View>

                  <DeleteIcon style={styles.rightIcon} fill={'#CC2D30'} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
          <Text style={styles.historyText}>Transaction History</Text>
          <Text style={styles.text}>
            You can see all transactions and keep tap on all transactions.
          </Text>
          <View style={styles.statusContainer}>
            <FlatList
              data={props.status}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              key={'_'}
              contentContainerStyle={styles.statusRow}
              keyExtractor={(item, index) => index.toString()}
              renderItem={props.renderStatus}
            />
          </View>
        </View>
        <View style={styles.flatlistView}>
          <Text style={styles.headingText}>
            {getStatusLabel(props.statusFilter)}(
            {props.filterTransactions.length ?? 0})
          </Text>
          <View style={styles.flatlist}>
            <FlatList
              data={props.filterTransactions}
              keyExtractor={(item, index) => item.id + index}
              renderItem={props.renderTransactions}
              ListFooterComponent={
                <>
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      No more content to show
                    </Text>
                  </View>
                </>
              }
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          text={'Export Report'}
          color={'#404040'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.m}
          lineHeight={Spacing.xl}
          leftIcon={
            <GenerateReportIcon
              fill={'#2A2A2A'}
              style={{ height: 15, width: 15 }}
            />
          }
          backgroundColor={'#F7F7F7'}
          borderWidth={1}
          borderColor={'#E1E1E1'}
          width={'49%'}
          height={Spacing.xl6}
          borderRadius={Spacing.s}
        />
        <Button
          text={'Add New Bank'}
          color={'#FFF'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.m}
          lineHeight={Spacing.xl}
          leftIcon={
            <PlusIcon fill={'#FFFFFF'} style={{ height: 20, width: 20 }} />
          }
          backgroundColor={'#009FD9'}
          borderWidth={1}
          borderColor={'#009FD9'}
          width={'49%'}
          height={Spacing.xl6}
          borderRadius={Spacing.s}
          onPress={() => props.openModal('add_new_bank_account_modal')}
        />
      </View>
      <ModalRenderer
        activeModal={props.activeModal}
        closeModal={props.closeModal}
        openModal={props.openModal}
      />
    </View>
  );
};

export default Design;
