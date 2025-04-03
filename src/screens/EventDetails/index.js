import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLORS, COMMON_STYLE } from '../../constant';
import { ResponsiveHeight, ResponsiveWidth } from '../../helper';
import { deleteEvent } from '../../action';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';



export function EventDetails({ route,navigation }) {
  const dispatch = useDispatch();
  const eventDetails = useSelector(state => state.eventDetails);
  






  return (
    <View style={{ flex: 1 }}>
     
   
     <View style={styles.cardView}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={COMMON_STYLE.textStyle(14, 'black', 'bold')}>{"Task Name: "}</Text>
          <Text style={COMMON_STYLE.textStyle(14, 'black')}>{route?.params.task_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={COMMON_STYLE.textStyle(14, 'black', 'bold')}>{"Description: "}</Text>
          <Text style={COMMON_STYLE.textStyle(14, 'black')}>{route?.params.description}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={COMMON_STYLE.textStyle(14, 'black', 'bold')}>{"Start date: "}</Text>
          <Text style={COMMON_STYLE.textStyle(14, 'black')}>{route?.params.startdate}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={COMMON_STYLE.textStyle(14, 'black', 'bold')}>{"End date: "}</Text>
          <Text style={COMMON_STYLE.textStyle(14, 'black')}>{route?.params.enddate}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={COMMON_STYLE.textStyle(14, 'black', 'bold')}>{"Reccurance Type: "}</Text>
          <Text style={COMMON_STYLE.textStyle(14, 'black')}>{route?.params.event_type}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ResponsiveWidth(3),
    marginRight: ResponsiveWidth(1),
  },
  cardView: {
    backgroundColor: '#fff',
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 8,
    paddingVertical: ResponsiveHeight(1.5),
    paddingHorizontal: ResponsiveWidth(4),
  },
  floatBtnStyle: {
    width: ResponsiveWidth(12),
    height: ResponsiveWidth(12),
    right: ResponsiveWidth(3),
    backgroundColor: COLORS['blue'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ResponsiveWidth(12),
    bottom: ResponsiveHeight(1.5),
    position: 'absolute',
  },
});

