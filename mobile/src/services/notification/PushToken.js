// Bare
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

// I like extracting all my constants in a separate file
// The EXPERIENCE_ID is a simple string which is basically
// your username/app-name. So in this case, it'd be
// @farazpatankar/full-stack-react-native
// import { EXPERIENCE_ID } from './constants';

const getPushToken = async () => {
  let experienceId;
  if (!Constants.manifest) experienceId = EXPERIENCE_ID;
  const { data: token } = await Notifications.getExpoPushTokenAsync({ experienceId });
  return token;
}

// Managed
import { Notifications } from 'expo';

const getPushToken = async () => {
  const token = await Notifications.getExpoPushTokenAsync();
  return token;
}