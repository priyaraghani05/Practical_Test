import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COLORS, COMMON_STYLE } from '../../constant';
import { ResponsiveHeight, ResponsiveWidth } from '../../helper';
import { deleteEvent } from '../../action';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';



export function Events({ navigation }) {
  const dispatch = useDispatch();
  const eventDetails = useSelector(state => state.eventDetails);
  
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("today");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const swipeableRefs = useRef({}); // Store multiple refs for swipeable items

  const filterOptions = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "This Year", value: "year" },
  ];

  useEffect(() => {
    setEventData(eventDetails?.data || []);    
  }, [eventDetails]);

  useEffect(() => {
    updateFilteredEvents(selectedFilter);
  }, [selectedFilter, eventData]); 

  const updateFilteredEvents = (filterType) => {    
    const today = moment().format('YYYY-MM-DD');
    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');
    const startOfYear = moment().startOf('year');
    const endOfYear = moment().endOf('year');
  
    const filterData = eventData.filter(task => {
      const startDate = moment(task.start_date);
      const endDate = moment(task.end_date);
  
      switch (filterType) {
        case 'today':
          return today >= startDate.format('YYYY-MM-DD') && today <= endDate.format('YYYY-MM-DD');
        case 'week':
          return startDate.isBefore(endOfWeek) && endDate.isAfter(startOfWeek);
        case 'month':
          return startDate.isBefore(endOfMonth) && endDate.isAfter(startOfMonth);
        case 'year':
          return startDate.isBefore(endOfYear) && endDate.isAfter(startOfYear);
        default:
          return false;
      }
    });

    setFilteredEvents(filterData)    
  };



  const renderRightActions = (item) => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => deleteEventItem(item.id)} style={styles.deleteContainer}>
        <Icon name={'delete'} size={ResponsiveWidth(6)} color={COLORS['dark_red']} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClickItem(item)} style={styles.editContainer}>
          <Icon name={'edit'} size={ResponsiveWidth(6)} color={COLORS['black']} />
      </TouchableOpacity>
    </View>
  );

  function onClickItem(item) {
    navigation.navigate("Create Event",{...item,isEdit:true});
    swipeableRefs.current[item.id]?.close();

    }

  const deleteEventItem = (id) => {
    Alert.alert('Are you sure you want to remove this event?', '', [
      {
        text: 'Cancel',
        onPress: () => swipeableRefs.current[id]?.close(),
        style: 'cancel',
      },
      {
        text: 'OK', 
        onPress: () => {
          dispatch(deleteEvent(id));
          swipeableRefs.current[id]?.close();
        }
      },
    ]);
  };


  const _renderTextView = (title,item) => (
          <View style={styles.textContainer}>
            <Text style={styles.titleStyle}>{`${title} :  `}</Text>
            <Text style={item.itemStyle}>{item}</Text>
          </View>
  )
  
  const _renderItems = ({ item }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[item.id] = ref)}
      renderRightActions={() => renderRightActions(item)}>
      <TouchableOpacity style={styles.cardView}  onPress={() => {
        console.log("items >>>>> ",item);

        navigation.navigate("Event Details",item)
      }} >
          {_renderTextView("Task Name",item.task_name)}
          {_renderTextView("Description",item.description)}
          {_renderTextView("Start date",moment(item.start_date).format('YYYY-MM-DD'))}
          {_renderTextView("End date",moment(item.end_date).format('YYYY-MM-DD'))}
          {_renderTextView("Reccurance",item.event_type)}
      </TouchableOpacity>
    </Swipeable>
  );



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style ={{marginHorizontal:ResponsiveWidth(4),marginVertical:ResponsiveHeight(2)}}>

      <DropDownPicker
        open={open}
        value={selectedFilter}
        items={filterOptions}
        setOpen={setOpen}
        setValue={setSelectedFilter}
        placeholder="Select Filter"
        />
        </View>
      <FlatList
        data={filteredEvents}
        renderItem={_renderItems}
        keyExtractor={(item) => `task_${item.id}`}
        style={{ marginBottom: ResponsiveHeight(8),paddingBottom:ResponsiveHeight(6) }}
        showsVerticalScrollIndicator={false}
        />
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate('Create Event')
          
        }}
        style={styles.floatBtnStyle}
        >
        <Text style={{ color: 'white', fontSize: 16 }}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  editContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ResponsiveWidth(1),
    marginRight: ResponsiveWidth(2),
},
deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ResponsiveWidth(3),
    marginRight: ResponsiveWidth(1),
},
textContainer:{
  flexDirection: 'row',
  paddingVertical:ResponsiveHeight(0.5)
},
titleStyle:{
  ... COMMON_STYLE.textStyle(14, 'black', 'bold')
 },
 itemStyle:{
 ...COMMON_STYLE.textStyle(14, 'black'),
 paddingHorizontal:ResponsiveWidth(2)
},
});

