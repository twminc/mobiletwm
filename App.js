/*This is an Example of Calling Other Class Function in React Native*/
import React, {Component} from 'react';
//import React in our project
import {StyleSheet, View, Alert, Platform, Button, Text} from 'react-native';

import axios from 'axios';

var btc_usd = 0;
//import all the components we will need in our project


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sfx_usd: 0.00,
            sft_usd: 0.00,
        };
    }

    get_btc_coindesk = async () => {
        return axios({
            url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
            method: 'get',
        }).then((res) => {
            return res.data;
        });
    };

    get_order_book = async (pair) => {
        return axios({
            method: 'get',
            url: 'https://app.xcalibra.com/api/public/v1/order-book/' + pair,
        }).then((resp) => {
            return resp.data;
        });
    };

    get_sfx_price = async () => {

        try {
            let btc_price = await this.get_btc_coindesk();
            let btc_rate = btc_price.bpi.USD.rate.replace(/[^\d\.\-]/g, '');
            console.log(btc_rate);
            btc_usd = parseFloat(btc_rate);

            try {

                let xca_orders = await this.get_order_book('SFX_BTC');
                let sfx_usd_calc = btc_usd * xca_orders.sell[0][0].toFixed(8);

                this.setState({sfx_usd: sfx_usd_calc.toFixed(4)});


            } catch(err) {
                console.error(err);
                console.error(`error at getting the xca order book`);
            }

            try {

                let xca_orders = await this.get_order_book('SFT_BTC');
                let sft_usd_calc = btc_usd * xca_orders.sell[0][0].toFixed(8);

                this.setState({sft_usd: sft_usd_calc.toFixed(4)});


            } catch(err) {
                console.error(err);
                console.error(`error at getting the xca order book`);
            }

        } catch (err) {
            console.error(err);
            console.error(`error getting the btc usd price`);
        }

    };


    render() {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#F5FCFF',
                }}>
                <View style={{margin: 10}}>
                    <Button
                        title="Get Prices"
                        onPress={this.get_sfx_price}
                        color="#606070"
                    />

                   <Text> SFX ${this.state.sfx_usd}</Text>
                    <Text> SFT ${this.state.sft_usd}</Text>
                </View>
            </View>
        );
    }
}
