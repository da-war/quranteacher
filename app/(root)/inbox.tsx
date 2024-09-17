import BackButton from '@/components/global/BackButton';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const primaryColor = '#4E2999';

// Dummy data for messages
const dummyMessages = [
  { id: '1', text: 'Hello!', timestamp: new Date(), user: 'user' },
  { id: '2', text: 'Hi there!', timestamp: new Date(new Date().getTime() - 86400000), user: 'other' }, // Yesterday
  { id: '3', text: 'How are you?', timestamp: new Date(), user: 'user' },
  { id: '4', text: 'I am good, thanks!', timestamp: new Date(), user: 'other' },
  { id: '5', text: 'Glad to hear!', timestamp: new Date(), user: 'user' },
];

const ChatInboxScreen = () => {
  const insets = useSafeAreaInsets();
  const [newMessage, setNewMessage] = React.useState('');
  const flatListRef = React.useRef(null);

  React.useEffect(() => {
    // Scroll to the end of the list on mount
    flatListRef.current?.scrollToEnd({ animated: false });
  }, []);

  const handleSend = () => {
    if (newMessage.trim()) {
      // Handle sending new message (e.g., update Firestore or local state)
      setNewMessage('');
      Keyboard.dismiss();
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user === 'user' && styles.userMessageContainer,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.user === 'user' && styles.userMessageText,
        ]}
      >
        {item.text}
      </Text>
      <Text style={styles.timeText}>
        {new Date(item.timestamp).toLocaleTimeString()}
      </Text>
    </View>
  );

  const renderDateSeparator = (date:any) => {
    const now = new Date();
    const messageDate = new Date(date);
    const isToday = now.toDateString() === messageDate.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === messageDate.toDateString();

    let dateLabel = '';
    if (isToday) dateLabel = 'Today';
    else if (isYesterday) dateLabel = 'Yesterday';
    else dateLabel = messageDate.toLocaleDateString();

    return (
      <View style={styles.dateSeparatorContainer}>
        <Text style={styles.dateSeparatorText}>{dateLabel}</Text>
      </View>
    );
  };

  // Group messages by date
  const groupedMessages = () => {
    const grouped = {};
    dummyMessages.forEach((message) => {
      const date = message.timestamp.toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(message);
    });
    return grouped;
  };

  // Convert grouped messages to an array, preserving date order
  const groupedMessagesArray = Object.keys(groupedMessages()).map(date => ({
    date,
    messages: groupedMessages()[date]
  })).reverse(); // Reverse the grouped array to show the latest at the bottom

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, backgroundColor: primaryColor }}>
        <BackButton title='Inbox' titleStyle='text-white' />
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={insets.bottom}
      >
        <FlatList
          ref={flatListRef}
          data={groupedMessagesArray.flatMap(group => [
            { date: group.date, type: 'dateSeparator' },
            ...group.messages
          ])}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
            item.type === 'dateSeparator' 
              ? renderDateSeparator(item.date) 
              : renderItem({ item })
          }
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} // Scroll to end when content changes
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            placeholderTextColor="#666"
            value={newMessage}
            onChangeText={setNewMessage}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal:10
  },
  messagesList: {
    paddingBottom: 80, // Space for the input field
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#eee',
    maxWidth: '80%',
  },
  userMessageContainer: {
    backgroundColor: primaryColor,
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#000',
  },
  userMessageText: {
    color: '#fff',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
  },
  dateSeparatorContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateSeparatorText: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f4f4f4',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatInboxScreen;
