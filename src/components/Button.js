import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PopinsFont } from '../helpers/Fonts';

export const Button = ({
  disabled,
  text,
  margin,
  marginBottom,
  fontSize,
  marginHorizontal,
  backgroundColor,
  onPress,
  marginTop,
  color,
  elevation,
  flex,
  height,
  width,
  borderRadius,
  borderWidth,
  borderColor,
  padding,
  paddingHorizontal,
  marginVertical,
  fontFamily,
  style,
  textTransform,
  leftIcon,
  rightIcon,
  iconSpacing = 8,
  alignSelf,
  textDecorationLine,
  lineHeight,
  marginLeft,
  marginRight,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        ...style,
        marginBottom: marginBottom,
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
        flex: flex,
        alignSelf: alignSelf || 'center',
        backgroundColor: backgroundColor,
        borderWidth: borderWidth,
        height: height,
        width: width,
        borderRadius: borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: marginTop,
        elevation: elevation,
        borderColor: borderColor,
        padding: padding,
        margin: margin,
        paddingHorizontal: paddingHorizontal,
        marginLeft: marginLeft,
        marginRight: marginRight,
      }}
    >
      {/* Left Icon */}
      {leftIcon && (
        <View style={{ marginRight: text ? iconSpacing : 0 }}>{leftIcon}</View>
      )}

      {text && (
        <Text
          style={{
            color: color ? color : '#FFF',
            fontSize: fontSize,
            textAlign: 'center',
            fontFamily: fontFamily ? fontFamily : PopinsFont.regular,
            textTransform: textTransform ? textTransform : 'none',
            textDecorationLine: textDecorationLine
              ? textDecorationLine
              : 'none',
            lineHeight,
          }}
        >
          {text}
        </Text>
      )}

      {/* Right Icon */}
      {rightIcon && (
        <View style={{ marginLeft: text ? iconSpacing : 0 }}>{rightIcon}</View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
