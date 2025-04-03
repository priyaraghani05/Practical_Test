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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})