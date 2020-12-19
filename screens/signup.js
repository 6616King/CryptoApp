import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';


export default class Signup extends Component {

    constructor() {
        super();
        this.state = { 
        displayName: '',
        email: '', 
        password: '',
        isLoading: false
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerUser = () => {
        if(this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!')
        } else if ( this.state.password.length < 6 ){
            Alert.alert('Password need to be at least 6 character!')
        } else{
            this.setState({
                isLoading: true,
            })
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                res.user.updateProfile({
                displayName: this.state.displayName
                })
                console.log('User registered successfully!')
                this.setState({
                isLoading: false,
                displayName: '',
                email: '', 
                password: ''
                })
                this.props.navigation.navigate('Login')
            })
            .catch(error => this.setState({ errorMessage: error.message, isLoading: false}, Alert.alert('Please enter correct email!')))      
        }
    }

    render() {
        if(this.state.isLoading){
        return(
            <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
            </View>
        )
        }    
        return (
        <View style={styles.container}>  
            <Text style={styles.baseText}>
                Name:
            </Text>
            <TextInput
                style={styles.inputStyle}
                value={this.state.displayName}
                onChangeText={(val) => this.updateInputVal(val, 'displayName')}
            />      
            <Text style={styles.baseText}>
                Email:
            </Text>
            <TextInput
                style={styles.inputStyle}
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
            <Text style={styles.baseText}>
                Password:
            </Text>
            <TextInput
                style={styles.inputStyle}
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
            />   
            <Button
                color="#00bb57"
                title="Signup"
                onPress={() => this.registerUser()}
            />
            <Text style={styles.space}>
            </Text>
            <Button
                color="grey"
                title="Back"
                onPress={() => this.props.navigation.navigate('Login')}
            />                          
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    baseText:{
        fontSize: 20
    },
    inputStyle: {
        width: '100%',
        marginBottom: 40,
        paddingBottom: 5,
        alignSelf: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    space:{
        height: 30
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});