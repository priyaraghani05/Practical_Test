
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { ResponsiveHeight, ResponsiveWidth } from '../../helper';
import { COMMON_STYLE } from '../../constant/commonStyle';
import { ButtonView } from '../../components';
import { LABLE } from '../../constant';
import { getLoginDetails } from '../../reducer/getLoginDetails';
import { saveLoginDetails } from '../../action';

import { useDispatch, useSelector } from 'react-redux';



export function Signup({navigation}) {
    const dispatch = useDispatch();

  const [input, setInput] = useState({
    fName: { value: '', isError: false, errorText: '', placeholder: 'First Name' },
    phone: { value: '', isError: false, errorText: '', placeholder: 'Phone No' },
    email: { value: '', isError: false, errorText: '', placeholder: 'Email' },
    password: { value: '', isError: false, errorText: '', placeholder: 'Password' }
})
const [isLoaded, setLoaded] = useState(false)



const _renderInputView = (key) => {
  return (
      <View style={{ marginHorizontal: ResponsiveWidth(6), marginVertical: ResponsiveHeight(1) }} key={key}>
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
      fName: {
          message: "First Name should not be empty",
          validate: (value) => value.trim().length > 0,
      },
      phone: {
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


function isFormValid() {
    return Object.values(input).every((field) => !field.isError);
}


function callSignUpApi() {
  checkValidation().then(async () => {
      if (isFormValid()) {
          setLoaded(true)
          const userData = {
              'email': input['email']?.value,
              'fname': input['fName']?.value,
              'phone': input['phone']?.value,
              'password': input['password']?.value,
              "IsLogin":"true",
          }
          setLoaded(false)
          dispatch(saveLoginDetails(userData))   
          navigation.navigate("Events")       
         
      }

  }).catch(e => {
      setLoaded(false)
      console.log("🚀 ~ checkValidation ~ e:", e)

  })
}




  return (
    <View>
      {_renderInputView("fName")}
      {_renderInputView("phone")}
      {_renderInputView("email")}
      {_renderInputView("password")}

      <ButtonView
                    text={LABLE['sign_up']}
                    onClick={() => callSignUpApi()}
                    isLoaded={isLoaded}

                />

    </View>
  );
}

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: '#314FA4',
        height: ResponsiveHeight(6),
        ...COMMON_STYLE.textStyle(14, 'black')
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




