import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import { COLORS, COMMON_STYLE } from '../../constant';
import { ResponsiveHeight, ResponsiveWidth } from '../../helper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';



export function EventDetails({ route,navigation }) {

  const [reccuranceData,setReccuranceData] = useState([])


useEffect(() => {
  if (route.params.event_type.toLowerCase()  !== "single") {
    generateRecurrenceDates()
  }

},[])



const generateRecurrenceDates = () => {
  try {
    let current = moment(route.params.start_date);
  const end = moment(route.params.end_date);
  const start = moment(route.params.start_date);
  const result = [];    
  while (current.isSameOrBefore(end)) {
    switch (route.params.event_type.toLowerCase()) {
      case 'daily':
         current.add(1, 'days'); 
        break;
  
      case 'weekly':
          current.add(1, 'weeks'); 
        break;
  
      case 'monthly':
          current.add(1, 'months'); 
        break;
  
      case 'yearly':
          current.add(1, 'years'); 
        break;
  
      default:
        console.warn("Unknown recurrence type");
        break;
    }

    if (current.isSameOrBefore(end) && !current.isSame(start, 'day')) {      
      result.push(current.format('YYYY-MM-DD'));
    }
   
  }
  const firstFiveDates = result.slice(0, 5);
  setReccuranceData(firstFiveDates)
    
  } catch (error) {
    console.log("error: " + error);
    
    
  }
  
};

const _renderItems = ({item,index}) =>(
  <>
  <View style={styles.dateItemContainer}>
  <Icon name={'date-range'} size={ResponsiveWidth(6)} color={COLORS['blue']} />
  <Text style={[COMMON_STYLE.textStyle(14, 'black'),{flex:1,marginHorizontal:ResponsiveWidth(2)}]}>{item}</Text> 
  </View>
  <View style={{borderBottomWidth:0.3,borderBottomColor:'grey'}} />
  </>
)

const _renderTextView = (title,item) => (
        <View style={styles.textContainer}>
          <Text style={styles.titleStyle}>{`${title} :  `}</Text>
          <Text style={item.itemStyle}>{item}</Text>
        </View>
)

  return (
    <SafeAreaView style={{ flex: 1 }}>
     <View style={styles.cardView}>
      {_renderTextView("Task Name",route?.params.task_name)}
      {_renderTextView("Description",route?.params.description)}
      {_renderTextView("Start date",moment(route?.params.start_date).format('YYYY-MM-DD'))}
      {_renderTextView("End date",moment(route?.params.end_date).format('YYYY-MM-DD'))}
      {_renderTextView("Reccurance",route?.params.event_type)}
      </View>

      {reccuranceData.length > 0 && (
        <View style ={styles.cardView}>
          <Text style={[COMMON_STYLE.textStyle(22, 'black', 'bold'),{marginVertical:ResponsiveHeight(2)}]}>{"Reccurance Data :"}</Text>
          <FlatList 
          data={reccuranceData}
          renderItem={_renderItems}
          />
          </View>
      )}
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
dateItemContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginVertical:ResponsiveHeight(1)
}

});

