import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TouchableOpacityBase,
    Image,
    ImageBackground,
    ScrollView,
    LogBox
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {FONTS, COLORS, SIZES, dummyData, icons, images} from '../constants';
import {PriceAlert, TransactionHistory} from '../components';

const Home = ({ navigation }) => {

    const [trending, setTrending] = useState(dummyData.trendingCurrencies)

    const [transactionHistory, setTransactionHistory] = useState(dummyData.transactionHistory)

    useEffect(() => {
       
        LogBox.ignoreLogs('VirtualizedList should never be nested')
        
    }, [])

    function renderHeader() {

     const renderItem = ({item, index}) => (
        <TouchableOpacityBase
        style={{
            width: 180,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
            borderRadius: 10,
            backgroundColor: COLORS.white
        }}
        onPress={() => navigation.navigate("CryptoDetail", {currency: item})}
        >
          {/*Currency*/}
          <View
          style={{
              flexDirection: 'row'
          }}
          >
              <View>
                  <Image
                  source={item.Image}
                  resizeMode= 'cover'


                  />
              </View>

              <View
              style={{
                  marginLeft: SIZES.base
              }}
              >
                  <Text
                  style={{
                      ...FONTS.h2
                  }}
                  >
                     {item.currency}
                  </Text>

                  <Text
                  style={{
                      color: COLORS.gray,
                      ...FONTS.body3
                  }}
                  >
                     {item.code}
                  </Text>

              </View>

          </View>

          {/*Value*/}
          <View
          style={{
              marginTop: SIZES.radius
          }}
          >
             <Text
             style={{
                 ...FONTS.h2
             }}
             >${item.amount}</Text>

             <Text
             style={{
                 COLOR: item.type == "I" ? Colors.green : COLORS.red, ...FONTS.h3
             }}
             >{item.changes}</Text>
          </View>
                  
        </TouchableOpacityBase>
    )

        return (
            <View
            style={{
                width: "100%",
                height: 290,
                ...styles.shadow
            }}
            >
                <ImageBackground
                source={images.banner}
                resizeMode='cover'
                style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding
                }}
                >
                  {/*Header Bar*/}
                  <View
                  style={{
                      marginTop: SIZES.padding * 2,
                      width: "100%",
                      alignItems: 'flex-end',
                      paddingHorizontal: SIZES.padding
                  }}
                  >
                    <TouchableOpacity
                    style={{
                        width: 35,
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("Notification on pressed")}
                    >
                        <Image
                        source={icons.notification_white}
                        resizeMode='contain'
                        style={{
                            flex: 1
                        }}
                        />

                    </TouchableOpacity>

                    </View>

                     {/*Balance*/}
                     <View
                     style={{
                         alignItems: 'center',
                         justifyContent: 'center'
                     }}
                     >
                         <Text
                         style={{
                             color: COLORS.white,
                             ...FONTS.h3
                         }}
                         >Your Portfolio Balance</Text>

                         <Text
                         style={{
                             color: COLORS.white,
                             ...FONTS.h1,
                             marginTop: SIZES.base
                         }}
                         >${dummyData.portfolio.balance}</Text>

                         <Text
                         style={{
                             color: COLORS.white,
                             ...FONTS.body5
                         }}
                         >{dummyData.portfolio.changes} Last 24 hours</Text>

                     </View>

                     {/*Tranding*/}
                     <View
                     style={{
                         position: 'absolute',
                         bottom: '-30'
                     }}
                     >
                         <Text
                         style={{
                             marginLeft: SIZES.padding,
                             color: COLORS.white,
                             ...FONTS.h2
                         }}
                         >
                             Trending
                         </Text>

                         <FlatList
                         contentContainerStyle={{marginTop: SIZES.base}}
                         data={trending}
                         renderItem={renderItem}
                         keyExtractor={item => `${item.id}`}
                         horizontal
                         showsHorizontalScrollIndicator={false}
                         />

                     </View>

                </ImageBackground>

            </View>
        )
    }

    function renderAlert() {
        return (
            <PriceAlert/>
        )
    }

    function renderNotice() {
        return (
            <View
            style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.secondary,
                ...styles.shadow
            }}
            >
                <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3
                }}
                >Investing Safety</Text>

                <Text
                style={{
                   marginTop: SIZES.base,
                   color: COLORS.white,
                   ...FONTS.body4,
                   lineHeight: 18
                }}
                >jhheiwiejiwejjeeeeeewjoeowjrowrjr
                    rwjwirjrijwrijwirjirurijwrjrr
                    ewkweiuweirwiriuriwjriwjrij
                </Text>

                <TouchableOpacityBase
                style={{
                    marginTop: SIZES.base
                }}
                onPress={() => console.log("Learn More")}
                >
                    <Text
                    style={{
                        textDecorationLine: 'underline',
                        color: COLORS.green,
                         ...FONTS.h3
                    }}
                    >
                        Learn More
                    </Text>

                </TouchableOpacityBase>

            </View>
        )
    }

    function renderTransactionHistory() {
        return (
            <TransactionHistory
            customContainerStyle={{
                ...styles.shadow,
                history={transactionHistory}
            }}
            />
        )
    }

    return (
        <ScrollView>
            <View
            style={{
                flex: 1,
                paddingBottom: 130
            }}
            >
                {renderHeader()}

                {renderAlert()}

                {renderNotice()}

                {renderTransactionHistory()}

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,


        elevation: 8,
    }
})

export default Home;