import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import DashSideBar from "./Components/DashSideBar";
import DashProfile from "./Components/DashProfile";
import DashPosts from "./Components/DashPosts";
import DashUsers from "./Components/DashUsers";
import DashComments from "./Components/DashComments";
import DashboardComp from "./Components/DashBoardComponent";

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
      case 'profile':
        return <DashProfile />;
      case 'posts':
        return <DashPosts />;
      case 'users':
        return <DashUsers />;
      case 'comments':
        return <DashComments />;
      case 'dash':
        return <DashboardComp />;
      default:
        return <div>Select a tab to view content.</div>;
    }
  };

  const getTitleAndDescription = () => {
    switch (tab) {
      case 'profile':
        return { title: 'Profile', description: 'View and edit your profile.' };
      case 'posts':
        return { title: 'Posts', description: 'Manage your posts.' };
      case 'users':
        return { title: 'Users', description: 'View and manage users.' };
      case 'comments':
        return { title: 'Comments', description: 'Review comments on your posts.' };
      case 'dash':
        return { title: 'Dashboard', description: 'Overview of your dashboard.' };
      default:
        return { title: 'Dashboard', description: 'Select a tab to view content.' };
    }
  };

  const { title, description } = getTitleAndDescription();

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {/* SideBar */}
      <div>
        <DashSideBar />
      </div>
      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}
