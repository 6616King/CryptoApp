import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import firebase from '../database/firebase';

export default class Home extends Component {
    constructor() {
        super();
        this.state = { 
        uid: ''
        }
    }

    signOut = () => {
        firebase.auth().signOut().then(() => {
        this.props.navigation.navigate('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }  

    state={
        currency:"",
        crypto:"",
        cryptoCurrencyList:[]
    }

    async componentDidMount(){
        const url = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const cryptoCurrencyResult = await url.json()

        this.setState({
            cryptoCurrencyList:cryptoCurrencyResult
        })
    }

    render() {
        console.log(this.state.cryptoCurrencyList)
        this.state = { 
        displayName: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid
        }    
        return (
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style = {styles.textStyle}>
                    Welcome {this.state.displayName}
                </Text>

                <Button
                color="#ed1c24"
                title="Logout"
                onPress={() => this.signOut()}
                />
            </View>
            <View style={styles.contentContainer}> 
                
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

const height_proportion = '65%';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#fff'
    },
    welcomeContainer: {
        padding: 35,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    contentContainer: {
        padding: 35,
        paddingBottom: 80,
        backgroundColor: '#eee',
        height: height_proportion
    },
    footerContainer:{
        padding: 10,
        backgroundColor: '#29abe2',
    },
    footerText:{
        textAlign: 'center', 
        color: '#fff' 
    },
    textStyle: {
        fontSize: 30,
        marginBottom: 20
    }
});