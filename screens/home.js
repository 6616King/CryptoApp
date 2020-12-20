import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
import firebase from '../database/firebase';

export default class Home extends Component {
    constructor() {
        super();
        this.state = { 
        displayName: firebase.auth().currentUser.displayName,
        uid: firebase.auth().currentUser.uid,
        data:[],
        refreshing: true,
        }
    }

    // signout function for firebase
    signOut = () => {
        firebase.auth().signOut().then(() => {
        this.props.navigation.navigate('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }  

    // check if got data
    componentDidMount() {
        this.fetchCrypto();
    }

    // get data from api
    fetchCrypto() {
        this.setState({ refreshing: true });
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => res.json())
            .then(resJson => {
                this.setState({ data: resJson });
                this.setState({ refreshing: false });
            }).catch(e => console.log(e));
    }

    // display all crypto data into list
    renderItemComponent = (data) =>
        <View style={styles.tContainer}>
            <View style={styles.cryptoNameCon}>
                <Text style={styles.cryptoNameText}>Rank: {data.item.market_cap_rank}</Text>
                <Image style={styles.image} source={{ uri: data.item.image }} />
                <Text style={styles.cryptoNameText}>{data.item.name} ({data.item.symbol})</Text>
            </View>
            <View style={styles.cryptoPriceCon}>
                <Text style={styles.cryptoPriceTextCap}>Market Cap: {data.item.market_cap}</Text>
                {data.item.price_change_percentage_24h >= 0 ? <Text style={styles.cryptoPriceText}>24h: <Text style={styles.cryptoPriceTextGreen}>{data.item.price_change_percentage_24h}</Text></Text>: null}
                {data.item.price_change_percentage_24h < 0 ? <Text style={styles.cryptoPriceText}>24h: <Text style={styles.cryptoPriceTextRed}>{data.item.price_change_percentage_24h}</Text></Text>: null}
                <Text style={styles.cryptoPriceText}>Price (AUD)</Text>
                <Text style={styles.cryptoPrice}>$ {data.item.current_price}</Text>
            </View>
        </View>


    // scroll down will refresh data
    handleRefresh = () => {
        this.setState({ refreshing: false }, () => { this.fetchCrypto() }); // call fetchCrypto after setting the state
    }

    render() {
        // api test console output
        // console.log('Cryptocurrency API pull data', this.state.data)  
        
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
                <SafeAreaView>
                    <FlatList
                        data={this.state.data}
                        renderItem={item => this.renderItemComponent(item)}
                        keyExtractor={item => item.id.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </SafeAreaView>
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

const height_proportion = '75%';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#fff'
    },
    tContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        marginBottom: 0,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 6,
    },
    cryptoNameCon:{
        
    },
    cryptoNameText:{
        fontSize: 18
    },
    cryptoPriceCon:{
        
    },
    cryptoPriceText:{
        fontSize: 18,
        textAlign: 'right'
    },
    cryptoPriceTextGreen:{
        textAlign: 'right',
        color: '#00bb57'
    },
    cryptoPriceTextRed:{
        textAlign: 'right',
        color: '#ed1c24'
    },
    cryptoPrice:{
        textAlign: 'right',
        fontSize: 25
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 4,
      },
    welcomeContainer: {
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    contentContainer: {
        paddingBottom: 10,
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
    }
});