import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  ArrowDown,
  AssignMember,
  Globe,
  JobsIcon,
  LeftArrow,
  MessageIcon,
  RatingStart,
  VerifiedIcon,
  VerticalDots,
} from '../../../../assets/svg';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './style';
import { FontSizes, Spacing } from '../../../../helpers/sizeHelper';
import { PopinsFont } from '../../../../helpers/Fonts';
import {
  filterStatus,
  getStatusLabel,
  statusColors,
} from '../../../../helpers/Data';
import Button from '../../../../components/Button';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
import { images } from '../../../../assets/images';
import { useState } from 'react';
import StatsCard from '../../../../components/Contractor/StatsCard';

const Design = props => {
  const topArray = [
    {
      name: 'Team Jobs',

      value: '22',
      key: '$1',
      icon: JobsIcon,
    },
    {
      name: 'Active Jobs',

      value: '3',
      key: '22',
      icon: JobsIcon,
    },
  ];

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  const [value, setValue] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backIconContainer}
        >
          <LeftArrow style={styles.leftIcon} />
        </TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.tag}>
            <RatingStart style={styles.globe} />
            <Text style={styles.public}>4.9</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.openModal('member_status_modal')}
            style={styles.tag2}
          >
            <View style={styles.dot} />
            <Text style={styles.inProgress}>Active</Text>
            <ArrowDown style={styles.arrow} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.secondContainer}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.view1}>
          <Image
            source={images.user1}
            style={styles.img}
            resizeMode="contain"
          />
          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text style={styles.name}>Mark Evens</Text>
              <VerifiedIcon style={styles.verified} fill={'#009FD9'} />
            </View>
            <Text style={styles.join}>Manager | Joined Since 2022</Text>
          </View>
        </View>
        <Button
          text={'Send Message'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          color={'#2A2A2A'}
          height={44}
          width={'90%'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.s}
          lineHeight={Spacing.xl}
          borderRadius={Spacing.s}
          leftIcon={<MessageIcon style={styles.sideIcon} fill={'#2A2A2A'} />}
          marginBottom={12}
          paddingHorizontal={18}
        />
        <View style={styles.infoView}>
          <TouchableOpacity
            onPress={() =>
              props.setShowMemberDetails(!props.showMemeberDetails)
            }
            style={styles.infoTouch}
          >
            <Text style={styles.hideText}>Hide Contact Info</Text>
            <View>
              <ArrowDown
                style={{
                  height: 10,
                  width: 18,
                  transform: [
                    { rotate: props.showMemeberDetails ? '180deg' : '0deg' },
                  ],
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {props.showMemeberDetails && (
          <View style={styles.detailsBox}>
            <View style={styles.boxView1}>
              <Text style={styles.boxLabel}>Email</Text>
              <Text style={styles.boxValue}>laurachen@outlook.com</Text>
            </View>
            <View style={{ padding: Spacing.s }}>
              <Text style={styles.boxLabel}>Phone</Text>
              <Text style={styles.boxValue}>(555) 678 4321</Text>
            </View>
          </View>
        )}
        <View style={styles.statsView}>
          <ScrollView
            contentContainerStyle={styles.content}
            horizontal
            showsHorizontalScrollIndicator={false}
            pointerEvents="none"
          >
            {topArray.map((item, index) => {
              return <StatsCard item={item} index={index} />;
            })}
          </ScrollView>
        </View>
        <View style={{ width: '100%' }}>
          <Text style={styles.memberText}>Member’s Jobs</Text>
          <View style={styles.dropDowncontainer}>
            <Dropdown
              disable={true}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Last 7 Days'}
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          <View style={styles.flatlistContainer}>
            <FlatList
              data={filterStatus}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              key={'_'}
              contentContainerStyle={styles.content2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={props.renderStatus}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.flatlistView}>
            <View style={styles.flatlist}>
              <FlatList
                data={props.filterMemberJobs}
                keyExtractor={(item, index) => item.key + index}
                renderItem={props.renderDashboardData}
                ListHeaderComponent={
                  <>
                    <Text style={styles.headingText}>
                      {getStatusLabel(props.statusFilter)}(
                      {props.filterMemberJobs.length ?? 0})
                    </Text>
                  </>
                }
                showsVerticalScrollIndicator={false}
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
        </View>
      </ScrollView>
      <View style={styles.button}>
        <Button
          leftIcon={<VerticalDots style={{ height: 6, width: 22 }} />}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          width={'20%'}
          height={36}
          borderRadius={FontSizes.s}
          onPress={() => props.openModal('member_qucik_action_modal')}
        />

        <Button
          text={'Assign Job'}
          color={'#FFF'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.s}
          lineHeight={Spacing.xl}
          height={44}
          backgroundColor={'#009FD9'}
          width={'80%'}
          borderRadius={Spacing.s}
          leftIcon={<AssignMember style={styles.sideIcon} fill={'#FFF'} />}
          iconSpacing={8}
          onPress={() => props.openModal('assign_job_from_team_modal')}
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
