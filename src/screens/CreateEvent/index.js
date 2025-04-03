

import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { ResponsiveHeight, ResponsiveWidth } from '../../helper';
import { COMMON_STYLE, LABLE } from '../../constant';

import { ButtonView } from '../../components';
import { addeEvent, updateEvent } from '../../action';

import DateTimePicker from '@react-native-community/datetimepicker';
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


function checkValidation() {
  const state_object = { ...input };
  let hasError = false;

  const validationRules = {
      task_name: {
          message: "First Name should not be empty",
          validate: (value) => value.trim().length > 0,
      },
      description: {
          message: "Phone np should not be empty",
          validate: (value) => value.trim().length > 0,
      },
      email: {
          message: (value) => {
              if (value.trim().length === 0) {
                  return "Email should not be empty"
              } else {
                  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                  return reg.test(value) ? "" : "Please enter a valid email"
              }
          },
          validate: (value) => value.trim().length > 0 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(value),
      },

      password: {
          message: "Password should not be empty",
          validate: (value) => value.trim().length > 0,
      },


  };
  return new Promise((resolve, reject) => {
      Object.keys(validationRules).forEach((field, index) => {
          const rule = validationRules[field];
          const value = state_object[field]?.value || '';

          if (rule.validate(value)) {
              state_object[field].isError = false;
              state_object[field].errorText = "";
          } else {
              state_object[field].isError = true;
              state_object[field].errorText = typeof rule.message === 'function' ? rule.message(value) : rule.message;

          }
      });

      setInput(state_object);
      resolve();
  });
}

const validateInputs = () => {
  let isValid = true;
  let updatedInput = { ...input };
  let updatedDateData = { ...dateData };

  // Task Name validation
  if (!input.task_name.value.trim()) {
    updatedInput.task_name.isError = true;
    updatedInput.task_name.errorText = "Task Name is required";
    isValid = false;
  }

  // Description validation
  if (!input.description.value.trim()) {
    updatedInput.description.isError = true;
    updatedInput.description.errorText = "Description is required";
    isValid = false;
  }

  // Start Date validation
  if (!dateData.startdate.value) {
    updatedDateData.startdate.isError = true;
    updatedDateData.startdate.errorText = "Start Date is required";
    isValid = false;
  }

  // End Date validation
  if (!dateData.enddate.value) {
    updatedDateData.enddate.isError = true;
    updatedDateData.enddate.errorText = "End Date is required";
    isValid = false;
  } else if (dateData.startdate.value && dateData.enddate.value < dateData.startdate.value) {
    updatedDateData.enddate.isError = true;
    updatedDateData.enddate.errorText = "End Date must be after Start Date";
    isValid = false;
  }

  // Event Type validation
  if (!value) {
    Alert.alert("Validation Error", "Please select an Event Type");
    isValid = false;
  }

  // Update state with validation results
  setInput(updatedInput);
  setDateData(updatedDateData);

  return isValid;
};

// Function to handle form submission
const handleCreateEvent = () => {
  if (validateInputs()) {
    const eventData = {
      task_name: input.task_name.value,
      description: input.description.value,
      start_date: moment(dateData.startdate.value).format('YYYY-MM-DD'),
      end_date: moment(dateData.enddate.value).format('YYYY-MM-DD'),
      event_type: value,
      id:  (route.params && route.params?.isEdit) ? route.params.id :  Date.now().toString(),
    }
    console.log("eventData >>>> ",eventData,dateData.startdate.value,dateData.enddate.value);
    
     (route.params && route.params?.isEdit) ? dispatch(updateEvent(eventData)): dispatch(addeEvent(eventData))
    navigation.goBack()
  }
};


const _handleDateConfirm = (key, date) => {
  if (key === "enddate" && dateData.startdate.value && date < dateData.startdate.value) {
    _setError(key, "End date must be after start date");
    return;
  }

  console.log("date >>>>> ",date);

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

      <TouchableOpacity
        onPress={() => setDateData((prev) => ({ ...prev, [key]: { ...prev[key], open: true } }))}
        style={{
          paddingVertical: ResponsiveHeight(2),
          paddingHorizontal:ResponsiveWidth(2),
          borderWidth: 1,
          borderColor: dateData[key].isError ? "red" : "#ccc",
          borderRadius: 5,
        }}
      >
        <Text>{dateData[key].value ? dateData[key].value.toDateString() : dateData[key].placeholder}</Text>
      </TouchableOpacity>

      {/* Error Text */}
      {dateData[key].isError && <Text style={{ color: "red" }}>{dateData[key].errorText}</Text>}
{console.log("dateData[key].value >>>> ", new Date(dateData[key].value) ,dateData[key].value.toDateString())}

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
                console.log("Selected date:", date);
              } else {
                console.warn("Date selection failed:", event, date);
              }
            
            }}
          />
        )}

      {/* Date Picker */}
      {/* <DatePicker
        modal
        open={dateData[key].open}
        date={dateData[key].value || new Date()}
        onConfirm={(date) => {
          console.log("date >>>>> ",date);
          
        }}
        onCancel={() => setDateData((prev) => ({ ...prev, [key]: { ...prev[key], open: false } }))}
        mode="date"
      /> */}
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
    headerText: {
        ...COMMON_STYLE.textStyle(24, 'black', 'bold'),
        marginHorizontal: ResponsiveWidth(6),
        marginVertical: ResponsiveHeight(2)
    },
    btnView: {
        marginHorizontal: ResponsiveWidth(6),
        height: ResponsiveHeight(7.5),
        backgroundColor: '#314FA4',
        borderRadius: ResponsiveWidth(6),
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: ResponsiveHeight(1.5)
    },
    imgContainer: {
        borderColor: 'black',
        width: ResponsiveWidth(4),
        height: ResponsiveWidth(4),
        borderWidth: 1,
        marginTop: ResponsiveHeight(0.8),
        alignItems: 'center',
        justifyContent: 'center'
    }
})

