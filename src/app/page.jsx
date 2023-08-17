
import BigCard from "@/components/BidCard";
import DashBoard from "@/components/Dashboard";
import { Card } from "@/components/BidCard";

export default function Home() {

  return (
    <>
      <DashBoard>
        <BigCard key='active-time' title='Active Time' type="num" dataName='active-time'> 
        <Card />
        <div className="h-60 bg-slate-600"></div>
        </BigCard>
      </DashBoard>
    </>
  );
}