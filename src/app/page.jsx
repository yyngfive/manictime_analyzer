import SideBar from "@/components/SideBar";
import BigCard from "@/components/BidCard";
import DashBoard from "@/components/Dashboard";
import { Card, SmallCard, MediumCard } from "@/components/DataCards";

export default function Home() {

  const sidebarMenu = [{ id: 'active-time', name: 'Active Time' },
  { id: 'apps', name: 'Top Apps' }];

  return (
    <>
      <div className="flex-initial h-full">
        <SideBar menu={sidebarMenu} />
      </div>
      <div className="flex-1 w-60 mx-5 mb-10">
        <DashBoard>
          <BigCard id='active-time' title='Active Time' type="time" dataName='active'>
            <Card title='Details' />
            <MediumCard title='Overview' type='chart'/>
            <SmallCard title='Average' type='avg'/>
            <SmallCard title='Max' type='max'/>
            
          </BigCard>
          <BigCard id='apps' title='Top Apps' type="num" dataName='apps'>
            <Card title='Details'/>
            <MediumCard title='Overview' type='chart'/>
            <MediumCard  type='top2'/> 
            
          </BigCard>
        </DashBoard>
      </div>

    </>
  );
}