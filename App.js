import React, { useState, useEffect } from "react";
import MainLayOut from "./src/components/NavSwitchBar";
import { initProductTable, getAllProducts } from "./src/modules/product";
import LoginView from "./src/views/LoginView";
import { NavigationContainer  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth, AuthProvider } from "./src/context/AuthContext";
import useNetworkSync from "./src/hooks/useNetworkSync";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from "react-native-safe-area-context";

// 如果分頁有異動，請記得改address
import DashboardView from './src/views/DashboardView';
import CreateView from './src/views/CreateView';
//import HintView from './src/views/HintView';
import AnnouncementView from './src/views/AnnouncementView';
import InventoryWrapper from "./src/views/InventoryView/InventoryWrapper";
import SettingWrapper from './src/views/SettingView/SettingWrapper';

// 使用者端忽略這個警告
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
]);


const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { userToken } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <Stack.Screen name="Login" component={LoginView} />
      ) : (
        <Stack.Screen name="Main" component={MainView} />
      )}
    </Stack.Navigator>
  );
}

function MainView() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [topView, setTopView] = useState(null);

  const handleSwitchTab = (tabName) => {
    setActiveTab(tabName);
    setTopView(null);
  };

  const handleTopNav = (viewName) => {
    setTopView(viewName); 
  };

  let ContentComponent;

  if (topView === 'Announcement') {
  ContentComponent = AnnouncementView;} 
  else if (topView === 'Setting') {
    ContentComponent = (props) => (
      <SettingWrapper
        onForceLogout={() => {
          setTopView(null);
          setActiveTab("Dashboard");
        }}
        {...props}
      />
    );
  }
  else {
    if (activeTab === 'Dashboard') ContentComponent = DashboardView;
    else if (activeTab === 'Create') ContentComponent = CreateView;
    else if (activeTab === 'Inventory') ContentComponent = InventoryWrapper;
  }


  useEffect(() => {
    const runDB = async () => {
      try {
        initProductTable();
        getAllProducts((products) => {
          console.log('🔥 Products loaded:');
          console.log(products);
        });
      } catch (e) {
        console.log('🚨 runDB error:', e);
      };
    };
  
    runDB();
  }, []);

  return (
    <MainLayOut
      onNavigateTop={handleTopNav}
      onSwitchTab={handleSwitchTab}
      activeTab={activeTab}
    >
      <ContentComponent key={topView || activeTab}  onNavigateTop={handleTopNav} onSwitchTab={handleSwitchTab}/>
    </MainLayOut>
  );
}

// export default function App() {
//   useNetworkSync();
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={{flex: 1 }} edges={['bottom', 'top', 'left', 'right']}>
//         <GestureHandlerRootView>
//           <AuthProvider>
//             <NavigationContainer>
//               <AppNavigator />
//             </NavigationContainer>
//           </AuthProvider>
//         </GestureHandlerRootView>
//       </SafeAreaView>
//     </SafeAreaProvider> 
//   );
// }

export default function App() {
  useNetworkSync();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1 }} edges={['bottom', 'top', 'left', 'right']}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <MainView />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider> 
  );
}
