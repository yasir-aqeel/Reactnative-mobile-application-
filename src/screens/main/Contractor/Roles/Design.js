import React from 'react';
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import AppColor from '../../../../helpers/AppColor';
import Header from '../../../../components/Header';
import { NoRecordFound, PlusIcon } from '../../../../assets/svg';
import { PopinsFont } from '../../../../helpers/Fonts';
import { Spacing, FontSizes } from '../../../../helpers/sizeHelper';
import ModalRenderer from '../../../../components/Contractor/ModalRenderer';
import Button from '../../../../components/Button';
import RolesCardSkeleton from '../../../../sekeletons/Contractor/RolesCardSkeleton';
import RolesPermissionsMatrix from '../../../../components/Contractor/RolesPermissionsMatrix/RolesPermissionsMatrix';
const Design = props => {
  return (
    <View style={styles.container}>
      <Header
        showBackIcon={true}
        title={'Roles'}
        navigation={props.navigation}
        showOtherIcons
      />

      <View style={styles.container}>
        <View style={styles.flatlist}>
          {props.isFirstLoading ? (
            <RolesCardSkeleton />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={props.allRoles}
              keyExtractor={(item, index) => item.id + index}
              renderItem={props.renderRolesCard}
              refreshControl={
                <RefreshControl
                  refreshing={props.refreshing}
                  onRefresh={props.onRefresh}
                  colors={[
                    AppColor.primaryBlue,
                    AppColor.green1,
                    AppColor.redDark,
                    AppColor.purpleLight,
                  ]}
                  progressBackgroundColor={AppColor.white}
                  tintColor={AppColor.primaryBlue}
                />
              }
              ListEmptyComponent={() => {
                if (
                  !props.isFirstLoading &&
                  (!props.allRoles || props?.allRoles?.length === 0)
                ) {
                  return (
                    <View style={styles.emptyView}>
                      <NoRecordFound style={{ height: 100, width: 100 }} />
                      <Text style={styles.text}>No Roles found!</Text>
                    </View>
                  );
                }
                return null;
              }}
            />
          )}
        </View>
        {Array.isArray(props.resources) && props.resources.length > 0 && (
          <>
            <View style={styles.textView}>
              <Text style={styles.textRole}>Role’s Permission</Text>
              {props.hasChanges && (
                <Button
                  text={props.isSavingPermissions ? '' : 'Save Changes'}
                  fontFamily={PopinsFont.regular}
                  fontSize={FontSizes.m}
                  color={props.isSavingPermissions ? 'transparent' : '#FFF'}
                  backgroundColor={'#009FD9'}
                  height={34}
                  borderRadius={8}
                  lineHeight={Spacing.xl}
                  onPress={props.handleSavePermissions}
                  disabled={props.isSavingPermissions}
                  leftIcon={
                    props.isSavingPermissions ? (
                      <ActivityIndicator size={'small'} color={'#FFF'} />
                    ) : null
                  }
                  width={130}
                />
              )}
            </View>
            <View style={styles.statusView}>
              <FlatList
                data={props.resources}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                key={'_'}
                contentContainerStyle={styles.content}
                keyExtractor={(item, index) => index.toString()}
                renderItem={props.renderPermissionTabs}
              />
            </View>
            <RolesPermissionsMatrix
              allResources={props.resources}
              visibleResources={props.filteredResources}
              permissionMatrix={props.currentPermissions}
              onChange={props.onPermissionsChange}
              loading={props.loading}
            />
          </>
        )}
      </View>

      {!props.isFirstLoading && (
        <Button
          text={'Add New Role'}
          fontFamily={PopinsFont.regular}
          fontSize={FontSizes.m}
          lineHeight={Spacing.xl}
          color={'#555555'}
          backgroundColor={'#F7F7F7'}
          borderColor={'#E1E1E1'}
          borderWidth={1}
          height={44}
          width={'90%'}
          borderRadius={Spacing.s}
          marginTop={12}
          leftIcon={<PlusIcon style={styles.icon} fill={'#2A2A2A'} />}
          onPress={() =>
            props.openModal('add_new_role_modal', {
              isUpdating: false,
            })
          }
          marginBottom={10}
        />
      )}

      <ModalRenderer
        activeModal={props.activeModal}
        closeModal={props.closeModal}
        openModal={props.openModal}
        state={props.state}
        setState={props.setState}
      />
    </View>
  );
};

export default Design;
