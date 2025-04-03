import React, { createContext, useState, useContext } from 'react';
import { COMMON_STYLE } from '../constant';
import { ActionSheetIOS, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ResponsiveHeight, ResponsiveWidth } from '../helper';


export const ButtonView = (props) => {
    const { text, onClick, bgColor = '#314FA4', textColor = "#FFFFFF", isDisabled = false, isLoaded = false } = props

    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={[styles.btnStyle, { backgroundColor: bgColor }]}
            onPress={onClick}
        >
            {isLoaded ?
                <ActivityIndicator size={'small'} color={"white"} />
                :
                <Text style={COMMON_STYLE.textStyle(18, 'white', 'bold')}>{text}</Text>}
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    btnStyle: {
        marginHorizontal: ResponsiveWidth(6),
        paddingVertical: ResponsiveHeight(1.5),
        // height: ResponsiveHeight(7.5),
        // backgroundColor: '#314FA4',
        borderRadius: ResponsiveWidth(4),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: ResponsiveHeight(2)
    }
})

