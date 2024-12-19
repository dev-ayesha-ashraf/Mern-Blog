import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashSideBar from "./Components/DashSideBar";
import DashPosts from "./Components/DashPosts";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const renderTabContent = () => {
    switch (tab) {
      case 'posts':
        return <DashPosts />;
      case 'dash':
        return <DashboardComp />;
      default:
        return <div>Select a tab to view content.</div>;
    }
  };

  const getTitleAndDescription = () => {
    switch (tab) {
      case 'posts':
        return { title: 'Posts', description: 'Manage your posts.' };
      case 'dash':
        return { title: 'Dashboard', description: 'Overview of your dashboard.' };
      default:
        return { title: 'Dashboard', description: 'Select a tab to view content.' };
    }
  };

  const { title, description } = getTitleAndDescription();

  return (
    <div>
      <div>
        <DashSideBar />
      </div>
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}
