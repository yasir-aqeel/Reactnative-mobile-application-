import { Text, TouchableOpacity, View } from 'react-native';
import { PopinsFont } from '../../../../helpers/Fonts';
import AppColor from '../../../../helpers/AppColor';
import { CheckBox } from '../../../../assets/svg';
import styles from './style';
import { roles } from '../../../../helpers/Data';
const RoleSelector = ({ props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.heading}>
          Great you have come a long way just few more steps which helps us to
          show you the jobs opportunity for you.
        </Text>
      </View>
      {roles.map((role, index) => {
        const Icon = role.icon;
        return (
          <TouchableOpacity
            key={role.key}
            onPress={() => {
              props.setForm(prev => ({
                ...prev,
                role: role.value,
              }));
            }}
            disabled
            style={[
              styles.touch,
              {
                backgroundColor:
                  props.form.role === role.value ? '#c7eefc' : '#F7F7F7',
                borderColor:
                  props.form.role === role.value ? '#009FD9' : '#E1E1E1',
                borderWidth: 1,
              },
            ]}
          >
            <View style={styles.box}>
              <CheckBox
                style={{ height: 26, width: 26 }}
                fill={props.form.role === role.value ? '#009FD9' : '#C3C3C3'}
              />

              <View style={styles.imageContainer}>
                <Icon
                  style={{ height: 60, width: 54 }}
                  fill={
                    props.form.role === role.value
                      ? AppColor.primaryBlue
                      : '#C3C3C3'
                  }
                />

                <Text
                  style={{
                    fontFamily: PopinsFont.regular,
                    fontSize: 16,
                    color:
                      props.form.role === role.value
                        ? AppColor.primaryBlue
                        : '#C3C3C3',
                    marginVertical: 10,
                  }}
                >
                  {role.label}
                </Text>
              </View>
              <View style={{ width: 25 }} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RoleSelector;
