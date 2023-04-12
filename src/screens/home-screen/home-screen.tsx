import React, { useEffect, useRef, useState } from "react";
import { Button, RefreshControl, Text, View } from "react-native";
import { Center, FlatList } from "native-base";
import Article from "../../components/articles";
import { styles } from "./style";
import { useAppDispatch } from "../../state/store";
import {
  clearAllNews,
  fetchAsyncNews,
  getAllNews,
} from "../../state/newsSlice/newsSlice";
import { useSelector } from "react-redux";
import { NewsData } from "../../models/news.model";
import ModelWebview from "../../components/modal-webview/modal-webview";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../../utils/pushNotifications";
import * as Notifications from "expo-notifications";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const data: never[] | NewsData[] = useSelector(getAllNews);

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] = useState<
    Notifications.Notification | boolean
  >(false);
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();

  const [showWebView, setShowWebView] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(clearAllNews());
    dispatch(fetchAsyncNews(""));
    // .then(() => setRefreshing(false))
    // .catch((error) => {
    //   console.error(error);
    //   setRefreshing(false);
    // });
    setRefreshing(false);
  };

  const handleBack = () => {
    setShowWebView(false);
  };

  useEffect(() => {
    dispatch(fetchAsyncNews(""));

    registerForPushNotificationsAsync().then((token: string | undefined) => {
      setExpoPushToken(token);
    });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        console.log("this is notification", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("this is resposeListener", response);
        console.log("this is notification", notification);
        setShowWebView(true);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Notifications.Subscription
      );
      Notifications.removeNotificationSubscription(
        responseListener.current as Notifications.Subscription
      );
    };
  }, []);

  //Set up a timer to send push notifications every 10 minutes
  setInterval(() => {
    sendPushNotification(expoPushToken);
  }, 60 * 10 * 1000);

  return (
    <View>
      <Center>
        <Text style={styles.title}>Top Headlines</Text>
      </Center>
      {(notification && typeof notification !== "boolean") ? (
        <ModelWebview
          visible={showWebView}
          url={notification.request.content.data.url}
          handleBack={handleBack}
        />
      ) : (
        <View></View>
      )}
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
      <FlatList
        marginY="18px"
        bounces={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={styles.flatList}
        data={data}
        renderItem={({ item }: { item: NewsData }) => (
          <Article
            title={item.title}
            author={item.author}
            description={item.description}
            publishedAt={item.publishedAt}
            urlToImage={item.urlToImage}
            source={item.source}
            url={item.url}
          />
        )}
      />
    </View>
  );
}
