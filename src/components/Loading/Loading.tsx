import React from "react";
import "./Loading.css";
import { useTranslation } from 'react-i18next'; 

const Loading: React.FC = () => {
const { t } = useTranslation(); 
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{t("loading")}</p>;
    </div>
  );
};

export default Loading;
