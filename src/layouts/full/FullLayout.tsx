
import { FC } from 'react';
import { Outlet } from "react-router";
import ScrollToTop from 'src/components/shared/ScrollToTop';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';



const FullLayout: FC = () => {
  return (
    <div className="flex w-full min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-[280px]">
        <Header />
        <div className="bg-lightgray h-full rounded-bb">
          <div className="max-w-[1200px] mx-auto px-6">
            <ScrollToTop>
              <div className="py-30">
                <Outlet/>
              </div>
            </ScrollToTop>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullLayout;
