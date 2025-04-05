import { StyleSheet } from 'react-native'
import { ResponsiveWidth, ResponsiveHeight, ResponsiveFont, Fonts } from '../helper'


export const COMMON_STYLE = StyleSheet.create({
    textStyle: (size, color = "black", weight = 'normal', align = 'left') => {
        return {
            fontSize: ResponsiveFont(size),
            color: color,
            fontWeight: weight,
            textAlign: align,
            fontFamily: 'TenorSans-Regular'
        }
    },
})