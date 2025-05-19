import React, { useState } from "react";
import SettingView from "./SettingView";
import StorageView from "./StorageView";
import FAQView from "./FAQView";
import PrivacyPolicyView from "./PrivacyPolicyView";

export default function SettingWrapper({ onForceLogout }) {
  const [subPage, setSubPage] = useState("Main");

  const navigateTo = (target) => {
    if (target === "Login") {
      onForceLogout && onForceLogout(); 
    } else {
      setSubPage(target);
    }
  };

  const navigateBack = () => {
    setSubPage("Main");
  };

  switch (subPage) {
    case "Storage":
      return <StorageView onNavigateTop={navigateBack} />;
    case "FAQ":
      return <FAQView onNavigateTop={navigateBack} />;
    case "Privacy":
      return <PrivacyPolicyView onNavigateTop={navigateBack} />;
    case "Main":
    default:
      return <SettingView onNavigateTop={navigateTo} />;
  }
}
