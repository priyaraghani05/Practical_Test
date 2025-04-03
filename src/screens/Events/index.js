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
  }, [selectedFilter, eventData]); // Re-run when `eventData` updates

  const updateFilteredEvents = (filter) => {


    
    const today = moment();
    const startOfWeek = today.startOf("week");
    const endOfWeek = today.endOf("week");
    const startOfMonth = today.startOf("month");
    const endOfMonth = today.endOf("month");
    const startOfYear = today.startOf("year");
    const endOfYear = today.endOf("year");
    console.log("filter >>>>> ",filter);


    let result = [];
    switch (filter) {
      case "today":
        result = filterEvents(today.startOf("day"), today.endOf("day"));
        break;
      case "week":
        result = filterEvents(startOfWeek, endOfWeek);
        break;
      case "month":
        result = filterEvents(startOfMonth, endOfMonth);
        break;
      case "year":
        result = filterEvents(startOfYear, endOfYear);
        break;
    }
    setFilteredEvents(result);
  };

  const filterEvents = (startRange, endRange) => {
    return eventData?.filter((event) => {
      console.log("event >>>> ",event);
      
      const eventStart = moment(event.start_date, "YYYY-MM-DD", true);
      const eventEnd = moment(event.end_date, "YYYY-MM-DD", true);
      if (!eventStart.isValid() || !eventEnd.isValid()) {
        console.warn("Invalid date format:", event.start_date, event.end_date);
        return false;
      }

      console.log("eventStart) >>>> ",event.start_date,event.end_date ,endRange, startRange,( eventStart.isValid() &&
      eventEnd.isValid() &&
      eventStart.isBetween(startRange, endRange, null, "[]")&&
      eventEnd.isBetween(startRange, endRange, null, "[]")));
      
  
      // Check if event overlaps with the given range
      return (
        eventStart.isValid() &&
      eventEnd.isValid() &&
      eventStart.isBetween(startRange, endRange, null, "[]")&&
      eventEnd.isBetween(startRange, endRange, null, "[]")
      );
    });
  };

  const renderRightActions = (id) => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => deleteEventItem(id)} style={styles.deleteContainer}>
        <Icon name={'delete'} size={ResponsiveWidth(6)} color={COLORS['dark_red']} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClickItem(item)} style={styles.editContainer}>
                <Icon name={'edit'} size={ResponsiveWidth(6)} color={COLORS['black']} />
            </TouchableOpacity>
    </View>
  );

  function onClickItem(item) {
    navigation.navigate("CreateEvent",{...item,isEdit:true})

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

  const _renderItems = ({ item }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[item.id] = ref)}
      renderRightActions={() => renderRightActions(item.id)}
    >
      <TouchableOpacity style={styles.cardView}  onPress={() => navigation.navigate("EventDetails",item)} >
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={COMMON_STYLE.textStyle(14, 'black', 'bold')}>{"Task Name: "}</Text>
          <Text style={COMMON_STYLE.textStyle(14, 'black')}>{item?.task_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={COMMON_STYLE.textStyle(14, 'black', 'bold')}>{"Description: "}</Text>
          <Text style={COMMON_STYLE.textStyle(14, 'black')}>{item?.description}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={{ flex: 1 }}>
      <DropDownPicker
        open={open}
        value={selectedFilter}
        items={filterOptions}
        setOpen={setOpen}
        setValue={setSelectedFilter}
        placeholder="Select Filter"
      />
      <FlatList
        data={filteredEvents}
        renderItem={_renderItems}
        keyExtractor={(item) => `task_${item.id}`}
        style={{ marginBottom: ResponsiveHeight(8) }}
      />
      <TouchableOpacity 
        onPress={() => navigation.navigate('CreateEvent')}
        style={styles.floatBtnStyle}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Add</Text>
      </TouchableOpacity>
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

