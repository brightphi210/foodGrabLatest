import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthProvider, useAuth } from '@/context/AuthContext';
import { Slot } from 'expo-router';
import { useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';


export {
  ErrorBoundary,
} from 'expo-router';




const MainLayout = () => {

  const {isAuthenticated} = useAuth()
  const segments = useSegments()
  const router = useRouter();
  let [seenScreen, setSeenScree] = useState<any>(false)
  let [verified, setVerified] = useState<any>(null)

  const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('welcomeScreen');
        setSeenScree(jsonValue)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
      getData();
  },[]);


  console.log(seenScreen);
  



  const getVerifiedData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('data');
        if(jsonValue){
          let newVerified = JSON.parse(jsonValue)
          setVerified(newVerified.data.emailVerificationStatus)
        }
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getVerifiedData();
  },[]);



  useEffect(()=>{
    if(typeof isAuthenticated == 'undefined') return 

    const inApp = segments[0] == '/(protected)'




    if((seenScreen === false || seenScreen === null) && isAuthenticated === false){
      router.replace('/public/welcome_one')
    }

    // else if(verified !== 'VERIFIED' && (isAuthenticated === true || seenScreen !== null)){
    //   router.replace('/otp_verification')
    // }

    else if(isAuthenticated && !inApp ){
      router.push('/authRoute/home_dash')
      router.replace('/home')
      // router.replace('/register')
      // router.replace('/account')
      // router.replace('/carts')
      // router.replace('/order')
      // router.replace('/authRoute/(profile)/personal')
      // router.replace('/authRoute/(profile)/wallet')
      // router.replace('/authRoute/(profile)/FAQs')
      // router.replace('/authRoute/(profile)/support')
      // router.replace('/authRoute/proceed_checkout')
      // router.replace('/authRoute/order_summary')
      // router.replace('/authRoute/order_status')
      // router.replace('/authRoute/order_details')
      // router.replace('/public/welcome_one')
      // router.replace('/public/welcome_one')
      // router.replace('/otp_verification')
    }else if(isAuthenticated == false ){
      router.replace('/login')

    }
  }, [isAuthenticated])


  return (
    <Slot />
  );
}

export default function RootLayoutNav() {
  SplashScreen.preventAutoHideAsync();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Railway1: require('../assets/fonts/Poppins-Regular.ttf'),
    Railway2: require('../assets/fonts/Poppins-Bold.ttf'),
    Railway3: require('../assets/fonts/Poppins-Medium.ttf'),
    ...FontAwesome.font,

  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);
  

  useEffect(() => {
    if (loaded) {
      <StatusBar style='light'/>
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; 
  }

  return (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
  );
}
