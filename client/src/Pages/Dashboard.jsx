import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import DashSideBar from "./Components/DashSideBar";
import DashProfile from "./Components/DashProfile";
import DashPosts from "./Components/DashPosts";
import DashUsers from "./Components/DashUsers";


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }

  }, [location.search])
  return (
    <div>
      {/* SideBar */}
      <div>
        <DashSideBar />
      </div>
      {/* Profile&Dashboard */}
      <div>
        {tab === 'profile' && <DashProfile />}
      </div>
      {/* posts... */}
      <div>
        {tab === 'posts' && <DashPosts />}
      </div>
      {/* Users */}
      <div>
        {tab === 'users' && <DashUsers />}
      </div>
    </div>
  )
}