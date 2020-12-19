import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image } from 'react-native';
import { color } from 'react-native-reanimated';
import firebase from '../database/firebase';


export default class Login extends Component {

    constructor() {
        super();
        this.state = { 
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

    userLogin = () => {
        if(this.state.email === '' || this.state.password === '') {
            Alert.alert('Enter details to login!')
        } else {
        this.setState({
            isLoading: true,
        })
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            console.log(res)
            console.log('User logged-in successfully!')
            this.setState({
            isLoading: false,
            email: '', 
            password: ''
            })
            this.props.navigation.navigate('Home')
        })
        .catch(error => this.setState({ errorMessage: error.message, isLoading:false}, Alert.alert('Incorrect Email or Password!')) )
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
            <View style={styles.logoContainer}>  
                <Image 
                style={styles.imgLogo}
                source={require('./image/logo.png')} />
            </View>
            <View style={styles.contentContainer}> 
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
            color="#29abe2"
            title="Login"
            onPress={() => this.userLogin()}
            />   
            <Text style={styles.space}>
            </Text>
            <Button
                color="#00bb57"
                title="Signup"
                onPress={() => this.props.navigation.navigate('Signup')}
            />
            </View>
            <View style={styles.footerContainer}>   
                <Text style={styles.footerText}>
                    Created by King Ann Khoo
                </Text>
            </View>           
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
        backgroundColor: '#fff'
    },
    logoContainer: {
        padding: 35,
        paddingBottom: 0,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    contentContainer: {
        padding: 35,
        paddingBottom: 80,
        backgroundColor: '#fff'
    },
    footerContainer:{
        padding: 10,
        backgroundColor: '#29abe2'
    },
    imgLogo: {
        width: 150,
        height: 80,
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
    footerText:{
        textAlign: 'center', 
        color: '#fff' 
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