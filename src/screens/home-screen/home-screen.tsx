import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Button, RefreshControl } from "react-native";
import { Center, FlatList, Heading, View } from "native-base";
import Article from "../../components/articles";
import { useAppDispatch } from "../../state/store";
import {
  clearAllNews,
  fetchAsyncNews,
  getAllNews,
  getLoadingState,
} from "../../state/newsSlice/newsSlice";
import { NewsData } from "../../models/news.model";
import ModalWebview from "../../components/modal-webview/modal-webview";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../../utils/pushNotifications";
import * as Notifications from "expo-notifications";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  // const data: never[] | NewsData[] = useSelector(getAllNews);
  const [newsData, setNewsData] = useState<never[] | NewsData[]>([]);

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] = useState<
    Notifications.Notification | boolean
  >(false);
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();

  const [showWebView, setShowWebView] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const isLoading = useSelector(getLoadingState);

  const onRefresh = async () => {
    setRefreshing(true);
    setNewsData([]);
    dispatch(clearAllNews());
    dispatch(fetchAsyncNews("")).then((data) => {
      setNewsData(data.payload);
    });
    setRefreshing(false);
  };

  const handleBack = () => {
    setShowWebView(false);
  };

  useEffect(() => {
    dispatch(fetchAsyncNews("")).then((data) => {
      setNewsData(data.payload);
    });

    registerForPushNotificationsAsync().then((token: string | undefined) => {
      setExpoPushToken(token);
    });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
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
        <Heading
          fontSize="24px"
          fontWeight="bold"
          color="primary.500"
          marginBottom="10px"
          marginTop="10px"
        >
          Top Headlines
        </Heading>
      </Center>
      {notification && typeof notification !== "boolean" && (
        <ModalWebview
          visible={showWebView}
          url={notification.request.content.data.url}
          handleBack={handleBack}
        />
      )}
      {/* to trigger the push notification for demo purpose */}
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#3182CE" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          data={newsData}
          renderItem={({ item }: { item: NewsData }) => (
            <Article
              title={item.title}
              author={item.author}
              description={item.description}
              publishedAt={item.publishedAt}
              urlToImage={item.urlToImage ? item.urlToImage : ""}
              source={item.source}
              url={item.url}
            />
          )}
        />
      )}
    </View>
  );
}
