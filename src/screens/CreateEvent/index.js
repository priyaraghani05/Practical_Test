

import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { ResponsiveHeight, ResponsiveWidth } from '../../helper';
import { COLORS, COMMON_STYLE, LABLE } from '../../constant';

import { ButtonView } from '../../components';
import { addeEvent, updateEvent } from '../../action';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';




export function CreateEvent({route,navigation}) {
   const dispatch = useDispatch();
 
   const [input, setInput] = useState({
     task_name: { value: '', isError: false, errorText: '', placeholder: 'Task Name' },
     description: { value: '', isError: false, errorText: '', placeholder: 'Description' },
 })
 const [isLoaded, setLoaded] = useState(false)

 const [open, setOpen] = useState(false);
 const [value, setValue] = useState(null);
 const [items, setItems] = useState([
   {label: 'Single', value: 'Single'},
   {label: 'Daily', value: 'Daily'},
   {label: 'weekly', value: 'weekly'},
   {label: 'monthly', value: 'monthly'},
   {label: 'yearly', value: 'yearly'},
 ]);
 const [dateData, setDateData] = useState({
  startdate: { value: new Date(), open: false, placeholder: "Start Date", errorText: "", isError: false },
  enddate: { value: new Date(), open: false, placeholder: "End Date", errorText: "", isError: false },
});


useEffect(() => {
if (route.params && route.params.isEdit) {
  
  _onChangeText(route.params.task_name,"task_name");
  _onChangeText(route.params.description,"description");
  setEditData(route.params.start_date,"start_date");
  setEditData(route.params.end_date,"end_date");
  setValue(route.params.event_type)
}
},[route.params])

function setEditData(date,key){
  setDateData((prev) => ({
    ...prev,
    [key]: { ...prev[key], value: date, open: false, isError: false, errorText: "" },
  }));

}

 
  
const _renderInputView = (key) => {
  return (
      <View style={{ marginHorizontal: ResponsiveWidth(4), marginVertical: ResponsiveHeight(1.5) }} key={key}>
          {input[key].value?.length > 0 && <Text style={COMMON_STYLE.textStyle(12, "#4F4F4F")}>{input[key].placeholder}</Text>}

          <TextInput
              value={input[key].value}
              placeholderText={input[key].placeholder}
              onChangeText={(text) => _onChangeText(text, key)}
              placeholder={input[key].placeholder}
              style={styles.inputView}
              placeholderTextColor="#ADA4A5"
              secureTextEntry={input[key].placeholder == 'Password'}

          />
          {(input[key]?.errorText?.length > 0 && input[key]?.isError) && <Text style={[COMMON_STYLE.textStyle(12, 'red')]}>{`${input[key]?.errorText}`}</Text>}

      </View>
  )
}

function _onChangeText(text, key) {
  const state_obj = { ...input }
  state_obj[key].value = text
  state_obj[key].isError = false
  state_obj[key].errorText = ""
  setInput(state_obj)
}



const validateInputs = () => {
  let isValid = true;
  let updatedInput = { ...input };
  let updatedDateData = { ...dateData };


  if (!input.task_name.value.trim()) {
    updatedInput.task_name.isError = true;
    updatedInput.task_name.errorText = "Task Name is required";
    isValid = false;
  }

  if (!input.description.value.trim()) {
    updatedInput.description.isError = true;
    updatedInput.description.errorText = "Description is required";
    isValid = false;
  }

  if (!dateData.startdate.value) {
    updatedDateData.startdate.isError = true;
    updatedDateData.startdate.errorText = "Start Date is required";
    isValid = false;
  }

  if (!dateData.enddate.value) {
    updatedDateData.enddate.isError = true;
    updatedDateData.enddate.errorText = "End Date is required";
    isValid = false;
  } else if (dateData.startdate.value && dateData.enddate.value < dateData.startdate.value) {
    updatedDateData.enddate.isError = true;
    updatedDateData.enddate.errorText = "End Date must be after Start Date";
    isValid = false;
  }

  if (!value) {
    Alert.alert("Validation Error", "Please select an Event Type");
    isValid = false;
  }

  setInput(updatedInput);
  setDateData(updatedDateData);

  return isValid;
};

const handleCreateEvent = () => {
  setLoaded(true)
  if (validateInputs()) {
    const eventData = {
      task_name: input.task_name.value,
      description: input.description.value,
      start_date: moment(dateData.startdate.value).format('YYYY-MM-DD'),
      end_date: moment(dateData.enddate.value).format('YYYY-MM-DD'),
      event_type: value,
      id:  route.params && route.params?.isEdit ? route.params.id :  Date.now().toString(),
    }    
    
     route.params && route.params?.isEdit ? dispatch(updateEvent(eventData)): dispatch(addeEvent(eventData))
    navigation.goBack()
  }
  setLoaded(false)
};


const _handleDateConfirm = (key, date) => {
  if (key === "enddate" && dateData.startdate.value && date < dateData.startdate.value) {
    _setError(key, "End date must be after start date");
    return;
  }

  setDateData((prev) => ({
    ...prev,
    [key]: { ...prev[key], value: date, open: false, isError: false, errorText: "" },
  }));
};



const _setError = (key, message) => {
  setDateData((prev) => ({
    ...prev,
    [key]: { ...prev[key], isError: true, errorText: message },
  }));
};




const _renderDateInput = (key) => {
  return (
    <View style={{ marginVertical: ResponsiveHeight(1.5) ,marginHorizontal:ResponsiveWidth(4)}} key={key}>
      {dateData[key].value && <Text style={{ color: "#4F4F4F" }}>{dateData[key].placeholder}</Text>}

      <View style={styles.dateContainer(dateData[key].isError)}>
        <Text style={[COMMON_STYLE.textStyle(14, 'black'),{flex:1}]} >{dateData[key].value ? dateData[key].value.toDateString() : dateData[key].placeholder}</Text>
        <TouchableOpacity onPress={() => setDateData((prev) => ({ ...prev, [key]: { ...prev[key], open: true } }))}>
          <Icon name={'date-range'} size={ResponsiveWidth(6)} color={COLORS['blue']} />
        </TouchableOpacity>
      </View>

      {dateData[key].isError && <Text style={{ color: "red" }}>{dateData[key].errorText}</Text>}

      {dateData[key].open && (
          <DateTimePicker
          value={dateData[key].value || new Date()}
            mode="date"
            display="default"
            onChange={(event,date) => {
              if (event.type === "dismissed") {
                console.log("Date picker dismissed");
                return;
              }
          
              if (date) {
                _handleDateConfirm(key, date);
              } 
            
            }}
          />
        )}
    </View>
  );
};



  return (
    <View style = {{flex:1,backgroundColor:'whote'}} >

      {_renderInputView("task_name")}
      {_renderInputView("description")}
      {_renderDateInput("startdate")}
      {_renderDateInput("enddate")}

      <View style ={{paddingHorizontal:ResponsiveWidth(4),marginVertical:ResponsiveHeight(1.5)}} >
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder='Select Event Type'
      />
      </View>
       <ButtonView
          text={LABLE['create']}
          onClick={() => handleCreateEvent()}
          isLoaded={isLoaded}
       />
    </View>
  );
}



const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: '#314FA4',
        height: ResponsiveHeight(6),
        ...COMMON_STYLE.textStyle(14, 'black'),
        paddingHorizontal:ResponsiveWidth(2)
    },
   dateContainer: (isError) => {
    return {
      paddingVertical: ResponsiveHeight(2),
          paddingHorizontal:ResponsiveWidth(2),
          borderWidth: 1,
          borderColor: isError ? "red" : "#ccc",
          borderRadius: 5,
          flexDirection:'row'
    }
   }
})

