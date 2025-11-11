// import { Sidebar } from 'flowbite-react';
// import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import FullLogo from '../shared/logo/FullLogo';
import NavItems from './NavItems';
import SidebarContent from './Sidebaritems';

const SidebarLayout = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-[280px] bg-[#1f2330] border-r border-gray-200 dark:border-gray-700">
      {/* Logo Section */}
      <div className="h-[64px] flex items-center justify-center px-6 bg-[#1f2330]">
        <FullLogo />
      </div>

      {/* Navigation Section */}
      <SimpleBar style={{ height: 'calc(100vh - 64px)', backgroundColor: '#1f2330' }}>
        <div className="p-4">
          {SidebarContent?.map((section, index) => (
            <div key={index} className="mb-8">
              {/* Section Heading */}
              <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase px-4 mb-4">
                {section.heading}
              </h5>

              {/* Section Items */}
              <div className="space-y-3">
                {section.children?.map((item) => (
                  <NavItems item={item} key={item.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
};

export default SidebarLayout;
