import React, { useState, useEffect } from "react";
import MainLayOut from "./src/components/NavSwitchBar";
//import { initProductTable, getAllProducts } from "./src/modules/product";


// 如果分頁有異動，請記得改address
import DashboardView from './src/views/DashboardView';
import CreateView from './src/views/CreateView';
import InventoryView from './src/views/InventoryView';
import HintView from './src/views/HintView';
import AnnouncementView from './src/views/AnnouncementView';
import SettingView from './src/views/SettingView';

export default function App() {
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

  if (topView === 'Hint') ContentComponent = HintView;
  else if (topView === 'Announcement') ContentComponent = AnnouncementView;
  else if (topView === 'Setting') ContentComponent = SettingView;
  else {
    if (activeTab === 'Dashboard') ContentComponent = DashboardView;
    else if (activeTab === 'Create') ContentComponent = CreateView;
    else if (activeTab === 'Inventory') ContentComponent = InventoryView;
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
      <ContentComponent key={topView || activeTab} />
    </MainLayOut>
  );
}
