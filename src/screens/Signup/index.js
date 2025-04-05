
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  View,
} from 'react-native';
import { ResponsiveHeight, ResponsiveWidth } from '../../helper';
import { COMMON_STYLE } from '../../constant/commonStyle';
import { ButtonView } from '../../components';
import { LABLE } from '../../constant';
import { saveLoginDetails } from '../../action';

import { CommonActions } from '@react-navigation/native';


import { useDispatch } from 'react-redux';



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
              keyboardType={key === 'phone' ? 'number-pad':'default'}

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
        message: (value) => {
            const trimmed = value.trim();
            if (trimmed.length === 0) return "Phone number should not be empty";
            if (!/^\d+$/.test(trimmed)) return "Phone number must contain digits only";
            if (trimmed.length !== 10) return "Phone number must be exactly 10 digits";
            return "";
          },
          validate: (value) => /^\d{10}$/.test(value.trim()),
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
        message: (value) => {
          const trimmed = value.trim();
          if (trimmed.length === 0) return "Password should not be empty";
    
          const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
    
          if (!strongPasswordRegex.test(trimmed)) {
            return "Password must be 8-16 characters long, include upper & lower case letters, a digit, and a special character";
          }
          return "";
        },
        validate: (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/.test(value.trim()),
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
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Events' },
              ],
            })
          );
         
      }

  }).catch(e => {
      setLoaded(false)
      console.log("🚀 ~ checkValidation ~ e:", e)

  })
}




  return (
    <SafeAreaView>
      {_renderInputView("fName")}
      {_renderInputView("phone")}
      {_renderInputView("email")}
      {_renderInputView("password")}

      <ButtonView
         text={LABLE['sign_up']}
         onClick={() => callSignUpApi()}
         isLoaded={isLoaded}
      />

    </SafeAreaView>
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
})




