import React from 'react';
import { Text,Modal ,ScrollView, View , TouchableOpacity , TextInput, StyleSheet, FlatList , KeyboardAvoidingView , Alert,Image, DrawerLayoutAndroidBase } from 'react-native';
import  * as  firebase from "firebase";
import db from "../config"
import BARTER from '../components/santaClaus'

export default class WelcomeScreen extends React.Component {

    constructor(){
        super()
        this.state={
          emailId:"",
          password:"",
          firstName:"",
          lastName:"",
          address:"",
          phoneNumber:"",
          confirmPass:"",
          isModalVisible:false
        }
    }

    userSignUp = (emailId, password,confirmPass) =>{
      if(password !==confirmPass){
        return Alert.alert("PASSWORD DOESN'T MATCH PLZ RECHECK")
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then((response)=>{
          db.collection("users").add({
            firstName:this.state.firstName,
            phoneNumber:this.state.phoneNumber,
            emailId:this.state.emailId,
            lastName:this.state.lastName,
            address:this.state.address,
          })
          return Alert.alert("USER ADDED SUCCESSFULLY","",[{text:"ok",onPress:()=>this.setState({isModalVisible:false})}])
        })
        .catch(function(error) {
          // Handle Errors here.
          //var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });
      }
    }
  
    showModal=()=>{
      return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:"100%"}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <Text style={styles.modalTitle}>
                  REGISTER here
                </Text>
                <TextInput 
                  style={styles.formTextInput}
                  placeholder="firstName"
                  maxLength={10}
                  onChangeText={(text)=>{
                      this.setState({
                         firstName:text
                      })
                  }}
                />
                <TextInput 
                  style={styles.formTextInput}
                  placeholder="lastName"
                  maxLength={10}
                  onChangeText={(text)=>{
                      this.setState({
                         lastName:text
                      })
                  }}
                />
                <TextInput 
                  style={styles.formTextInput}
                  placeholder="phoneNumber"
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                      this.setState({
                         PhoneNumber:text
                      })
                  }}
                />
                <TextInput 
                  style={styles.formTextInput}
                  placeholder={"address"}
                  multiline={true}
                  onChangeText={(text)=>{
                      this.setState({
                         address:text
                      })
                  }}
                />
                <TextInput 
                  style={styles.formTextInput}
                  placeholder={"abc@barter.com"}
                  keyboardType="email-address"
                  onChangeText={(text)=>{
                      this.setState({
                          emailId:text
                      })
                  }}
                />
                  <TextInput 
                    style={styles.formTextInput}
                    placeholder={"password"}
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}
                  />
                  <TextInput 
                    style={styles.formTextInput}
                    placeholder={"confirmPass"}
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({
                            confirmPass:text
                        })
                    }}
                  />
                  <View>
                    <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={()=>this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPass)}
                    >
                      <Text style={styles.registerButtonText}>
                        REGISTER
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity 
                    style={styles.cancelButton}>
                    onPress={()=>this.setState({
                       isModalVisible:false
                    })}
                      <Text style={styles.registerButtonText}>
                        "CANCEL"
                      </Text>
                    </TouchableOpacity>
                  </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
    }
   
    userLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
          return Alert.alert("Successfully Login")
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  {this.showModal()}
                </View>
                <View style={styles.profileContainer}>
                    <BARTER/>
                    <Text style={styles.title}>BARTER</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput 
                      style={styles.loginBox}
                      placeholder="abc@barter.com"
                      placeholderTextColor="black"
                      keyboardType="email-address"
                      onChangeText={(text)=>{
                          this.setState({
                             emailId:text
                          })
                      }}
                    />
                    <TextInput 
                      style={styles.loginBox}
                      placeholder="password"
                      secureTextEntry={true}
                      placeholderTextColor="black"
                      onChangeText={(text)=>{
                          this.setState({
                             password:text
                          })
                      }}
                    />
                    <TouchableOpacity 
                      style={[styles.button,{marginBottom:15,marginTop:15}]}
                      onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}}
                    >
                      <Text>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.button,{marginBottom:15,marginTop:15}]}
                      onPress={()=>{
                        this.setState({isModalVisible:true})
                      }}
                    >
                      <Text>SIGNUP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:60,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})
