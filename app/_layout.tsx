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
import BottomSheetModalProvider from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider';


export {
  ErrorBoundary,
} from 'expo-router';


const MainLayout = () => {

  const {isAuthenticated} = useAuth()
  const segments = useSegments()
  const router = useRouter();
  let [seenScreen, setSeenScree] = useState<any>(false)
  let [verified, setVerified] = useState<any>(null)
  let [seenOTP, setSeenOTP]= useState<any>(false)

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



  const getOTP = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('otp');
        setSeenOTP(jsonValue)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getOTP();
  },[]);

  // console.log('This is has seen OTP', seenOTP);
  

  
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


    // if((seenScreen === false || seenScreen === null) && isAuthenticated === false){
    //   router.replace('/public/welcome_one')
    // }


    if(isAuthenticated && !inApp ){
      router.push('/authRoute/home_dash')
      // router.replace('/home')
      // router.replace('/register')
      // router.replace('/account')
      // router.replace('/carts')
      router.replace('/order')
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
    }
    
    if (isAuthenticated === false) {
      if (seenOTP === 'true') {
        router.replace('/otp_verification');
      } 

      else if(seenScreen === false || seenScreen === null){
        router.replace('/public/welcome_one')
      }
      
      else {
        router.replace('/login');
      }
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

