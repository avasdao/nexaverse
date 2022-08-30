/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
    Dimensions,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'
import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'

import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryTheme
} from 'victory-native'

import store from '../../store'

import Divider from '../../components/Divider'
import ScreenTitle from '../../components/ScreenTitle'
import Search from '../../components/Search'

const chartConfig = {
    // backgroundColor: "#e26a00",
    backgroundGradientFrom: "#f80",
    backgroundGradientTo: "#726",
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

const userData = [
    { timestamp: 1, earnings: 21.3 },
    { timestamp: 2, earnings: 23.65 },
    { timestamp: 3, earnings: 32.425 },
    { timestamp: 4, earnings: 12.9 },
    { timestamp: 5, earnings: 4.7 },
    { timestamp: 6, earnings: 8.2 },
]

const communityData = [
    { timestamp: 1, earnings: 13.5 },
    { timestamp: 2, earnings: 11.95 },
    { timestamp: 3, earnings: 18.725 },
    { timestamp: 4, earnings: 15.1 },
    { timestamp: 5, earnings: 2.7 },
    { timestamp: 6, earnings: 11.7 },
    { timestamp: 7, earnings: 11.7 },
]

/**
 * Dashboard Screen
 */
const Dashboard = observer(({navigation}) => {
    const [earningsTime, setEarningsTime] = React.useState('MONTHLY')

    const [price, setPrice] = React.useState('$6.35')
    const [marketCap, setMarketCap] = React.useState('$1,854,465,619')
    const [circulating, setCirculating] = React.useState('292,187,500')
    const [circulatingPct, setCirculatingPct] = React.useState('29%')

    /* Retreive window width. */
    const width = Dimensions.get('window').width

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            //
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    /* Handle search query. */
    const _handleQuery = (_query) => {
        console.log('QUERY (props):', _query)
    }

    const _changeEarningTime = () => {
        if (earningsTime === 'MONTHLY') {
            setEarningsTime('WEEKLY')
        } else if (earningsTime === 'WEEKLY') {
            setEarningsTime('DAILY')
        } else {
            setEarningsTime('MONTHLY')
        }
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <ScreenTitle title="DeFi Trade Center" />

            <Search
                style={tailwind('mx-2 mt-2 mb-1')}
                onQuery={_handleQuery}
                placeholder="What are you looking for?"
            />

            <View style={tailwind('p-3')}>
                <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        ApeCoin (APE)
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {price}
                    </Text>
                </View>

                <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-800 text-base font-bold')}>
                        Market Cap
                    </Text>

                    <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                        {marketCap}
                    </Text>
                </View>

                <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-800 text-base font-bold')}>
                        Circulating Supply
                    </Text>

                    <View style={tailwind('flex flex-row items-end')}>
                        <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                            {circulating}
                        </Text>

                        <Text style={tailwind('ml-1 mb-1 text-gray-500 text-xs font-bold')}>
                            {circulatingPct}
                        </Text>
                    </View>
                </View>
            </View>

            <Divider />

            <View style={tailwind('my-1')}>
                <View style={tailwind('px-3 flex flex-row justify-between items-center')}>
                    <View style={tailwind('flex flex-row items-end')}>
                        <Text style={tailwind('text-xl font-bold text-gray-500')}>
                            My APY Power
                        </Text>

                        <Text style={tailwind('ml-2 mb-0.5 font-bold text-gray-500')}>
                            vs. Community
                        </Text>
                    </View>

                    <Pressable
                        style={tailwind('py-1 px-3 border-2 border-yellow-500 bg-yellow-300 rounded')}
                        onPress={_changeEarningTime}
                    >
                        <Text style={tailwind('text-yellow-800 text-sm font-bold uppercase')}>
                            {earningsTime}
                        </Text>
                    </Pressable>
                </View>

                <View style={tailwind('mt-3 py-2 bg-gray-300 border-t border-b border-indigo-500')}>
                    <VictoryChart
                        width={width}
                        height={width / 1.75}
                        theme={VictoryTheme.material}
                        padding={{ top: 10, bottom: 35, left: 55, right: 20 }}
                        domainPadding={10}
                    >
                        <VictoryAxis
                            // tickValues specifies both the number of ticks and where
                            // they are placed on the axis
                            // tickValues={[1, 2, 3, 4]}
                            tickFormat={[
                                moment().subtract(5, 'months').format('MMM'),
                                moment().subtract(4, 'months').format('MMM'),
                                moment().subtract(3, 'months').format('MMM'),
                                moment().subtract(2, 'months').format('MMM'),
                                moment().subtract(1, 'months').format('MMM'),
                                moment().format('MMM'),
                            ]}
                        />

                        <VictoryAxis
                              dependentAxis
                              // tickFormat specifies how ticks should be displayed
                              tickFormat={(x) => `${x}%`}
                        />

                        <VictoryLine
                            data={communityData}
                            x='timestamp'
                            y='earnings'
                            // labels={({ datum }) => datum.y}
                            labels={['1', '2', '3', '4']}
                            interpolation='natural'
                            style={{
                                data: {
                                    stroke: '#D03B29',
                                    strokeWidth: 5,
                                }
                            }}
                        />

                        <VictoryBar
                            data={userData}
                            x='timestamp'
                            y='earnings'
                            style={{
                                data: {
                                    fill: '#3C8DA8',
                                }
                            }}
                        />

                    </VictoryChart>

                    <View style={tailwind('flex flex-row px-3 justify-between')}>
                        <Text style={tailwind('text-gray-600 text-xs italic')}>
                            Updated
                            <Text style={tailwind('text-gray-600 font-bold italic')}>
                                &nbsp;5 minutes ago
                            </Text>
                        </Text>

                        <Text style={tailwind('text-gray-400 text-xs')}>
                            Telr Analytics
                        </Text>
                    </View>
                </View>
            </View>

            <Pressable
                style={tailwind('mt-5 mb-5 mx-3 px-3 py-2 border-2 border-pink-800 bg-pink-600 rounded-md')}
                onPress={() => alert('More centers are coming soon..')}
            >
                <Text style={tailwind('text-xl text-pink-100 font-bold')}>
                    Choose Your App Center
                </Text>

                <View style={tailwind('ml-3')}>
                    <Text style={tailwind('mt-1 text-base text-pink-200 font-bold')}>
                        &#8618; DeFi Trade Center
                    </Text>

                    <Text style={tailwind('mt-1 text-base text-pink-200 font-bold')}>
                        &#8618; GameFi Play Center
                        <Text style={tailwind('text-sm text-pink-300')}> (coming soon)</Text>
                    </Text>

                    <Text style={tailwind('mt-1 text-base text-pink-200 font-bold')}>
                        &#8618; SocialFi Chat Center
                        <Text style={tailwind('text-sm text-pink-300')}> (coming soon)</Text>
                    </Text>
                </View>
            </Pressable>
        </ScrollView>
    )
})

export default Dashboard
