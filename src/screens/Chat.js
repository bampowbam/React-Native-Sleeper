import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  LogBox,
  Text,
  Dimensions,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BtnRound from './BtnRound';
import {GiphyDialog, GiphySDK, GiphyDialogEvent} from '@giphy/react-native-sdk';
LogBox.ignoreAllLogs();

GiphySDK.configure({apiKey: 'UUfQX6Sn04ye5TSO8CtIfcrrZuFrJIml'});

LogBox.ignoreLogs(['EventEmitter.removeListener']);
const {height, width} = Dimensions.get('screen');
const Chat = ({navigation}) => {
  const [check, setCheck] = useState(true);
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hey Johnny',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'John Doe',
        avatar:
          'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      image: '',
    },
    {
      _id: 2,
      text: 'Hi Emily, Yes offcource',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'john',
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
    },
    {
      _id: 3,
      text: 'Hi Johnny, Are you coming to party tonigth?',
      createdAt: new Date(),
      user: {
        _id: 3,
        name: 'Emily',
        avatar:
          'https://media.istockphoto.com/photos/confident-woman-picture-id1163683003?b=1&k=20&m=1163683003&s=612x612&w=0&h=MtFZJ-FKQXWZWVT8STA-9nsm9eShUXjCLlJAqCQxEfg=',
      },
      image: '',
    },
  ]);
  const [media, setMedia] = useState(null);
  let asyncMessages = [];

  const getAsync = async () => {
    console.log('************************************************');
    let asyncMsg = await AsyncStorage.getItem('asyncMessages');
    let parsedMessages = await JSON.parse(asyncMsg);
    asyncMessages = parsedMessages;
  };
  useEffect(() => {
    getAsync();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        JSON.stringify(asyncMessages),
        '   ___________________________',
      );
      if (asyncMessages.length <= 0) {
        console.log('async messages not set yet');
      } else {
        let messageToBeSend = asyncMessages.pop();
        console.log(
          messageToBeSend,
          ' ###################################### ',
        );
        onSend(messageToBeSend);
      }
    }, 50000);
    return () => clearInterval(interval);
  }, []);

  const isSameUser = (x, y) => {
    console.log(
      '-----------------------------------------',
      x,
      '-----------------------------------',
    );
    console.log(
      '-----------------------------------------',
      'End',
      '-----------------------------------',
    );
    if (x.user?._id === y.user?._id) {
      return true;
    } else {
      return false;
    }
    // console.log(x, y);
    // return true;
  };

  const isSameDay = (x, y) => {
    let timeX = new Date(x.createdAt);
    let timeY = new Date(y.createdAt);
    if (timeX.getDay() === timeY.getDay()) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    const handler = e => {
      setMedia(e.media);
      GiphyDialog.hide();
      onSend({
        _id: Math.floor(Math.random() * 100000),
        image: e.media.url,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'john',
          avatar:
            'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
      });
    };

    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler,
    );
    setMedia(null);
    return () => {
      listener.remove();
    };
  }, []);
  console.log(messages);
  const onSend = useCallback(
    (messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [media],
  );
  const renderBubble = props => {
    if (
      isSameUser(props.currentMessage, props.previousMessage) &&
      isSameDay(props.currentMessage, props.previousMessage)
    ) {
      setCheck(true);
      return (
        <View style={{position: 'relative'}}>
          <Bubble
            {...props}
            renderTime={() => false}
            tickStyle={{color: props.currentMessage.seen ? '#34B7F1' : '#999'}}
            wrapperStyle={{
              right: {
                backgroundColor: '#ffd100',
                marginRight: 45,
                paddingVertical: 10,
              },
              left: {backgroundColor: '#333', paddingVertical: 30},
            }}
            textStyle={{
              right: {color: 'black'},
              left: {color: '#ffd100'},
            }}
            timeTextStyle={{
              right: {
                color: 'black',
              },
              left: {color: '#ffd100'},
            }}
          />
        </View>
      );
    } else {
      setCheck(false);
      let date = new Date(props.currentMessage.createdAt);
      return (
        <View>
          {props.currentMessage.user._id === 1 && (
            <View
              style={{
                // width: width,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                position: 'absolute',
                top: 25,
                right: 0,
                // backgroundColor: 'red',
              }}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
                }}
                style={{width: 40, height: 40, borderRadius: 20}}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent:
                props.currentMessage.user._id === 1 ? 'center' : 'flex-start',
              alignItems: 'flex-end',
              width: width * 0.6,
            }}>
            <Text style={{marginRight: 20}}>
              {props.currentMessage.user.name}
            </Text>
            <Text>
              {date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </Text>
          </View>

          <Bubble
            {...props}
            renderTime={() => false}
            tickStyle={{color: props.currentMessage.seen ? '#34B7F1' : '#999'}}
            wrapperStyle={{
              right: {
                backgroundColor: '#ffd100',
                marginRight: 45,
                paddingVertical: 10,
              },
              left: {backgroundColor: '#333', paddingVertical: 10},
            }}
            textStyle={{right: {color: 'black'}, left: {color: '#ffd100'}}}
            timeTextStyle={{
              right: {
                color: 'black',
              },
              left: {color: '#ffd100'},
            }}
          />
        </View>
      );
    }
  };
  const renderSend = props => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BtnRound
          icon="camera"
          size={40}
          style={{marginHorizontal: 5}}
          onPress={() => GiphyDialog.show()}
        />
        <Send {...props}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              size={32}
              color="#ffd100"
              style={{
                backgroundColor: '#333',
                borderRadius: 16,
                marginRight: 5,
                marginBottom: 5,
              }}
            />
          </View>
        </Send>
      </View>
    );
  };
  const scrollToBottomComponent = props => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#ffd100',
          height: Platform.OS == 'ios' ? 120 : height * 0.07,
          borderBottomEndRadius: 15,
          color: '#333',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          paddingTop: Platform.OS == 'ios' ? 20 : 5,
        }}>
        <View>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              marginLeft: width * 0.05,
              marginTop: 10,
            }}>
            FRIENDS
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              marginLeft: width * 0.05,
              marginTop: 2,
            }}>
            last message by John Doe
          </Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage={false}
        onSend={messages => {
          setMedia(null);
          onSend(messages);
        }}
        user={{
          _id: 1,
          name: 'john',
          avatar:
            'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        // showUserAvatar={check ? true : false}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
