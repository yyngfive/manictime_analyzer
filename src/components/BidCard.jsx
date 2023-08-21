'use client';
import { useContext, useState } from "react";
import { dateContext } from "./DashBoardContext";
import BigCardProvider from "./BigCardContext";
import DropdownMenu from "./Selector";

export default function BigCard({ id, children, title, type = 'time', dataName }) {

    const date = useContext(dateContext);
    const [groupby, setGroupby] = useState('Day'); //Day Week Month Year
    const [maxDisplay, setMaxDisplay] = useState(type === 'num' ? 1 : 0); // 1 5 10 25,0 for type time

    const query = {
        api: `/api/manic/${dataName}`,
        params: {
            dateRange: JSON.stringify(date),
            groupby: groupby,
            maxDisplay: maxDisplay,
        }
    };

    //BUG Hide bugs caused by recharts(no significant influence)
    const error = console.error;
    console.error = (...args) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return (
        <div id={id}>
            <div className="flex flew-row mt-5 mx-1">
                <div className="flex-none w-50 place-self-end">
                    <h2 className="font-sans text-3xl font-black mx-2">{title}</h2>
                </div>
                <div className="flex flex-row justify-end gap-4 w-full mr-2">
                    {
                        type === 'num' && <DropdownMenu label='Top' options={[1, 2, 3, 4, 5, 10]} setValue={(value) => {
                            setMaxDisplay(value.target.value);
                        }} />
                    }
                    <DropdownMenu label='Group By' options={['Day', 'Week', 'Month', 'Year']} setValue={(value) => {
                        setGroupby(value.target.value);
                    }}
                    />
                </div>

            </div>
            <div className="divider"></div>
            {/* <p>fetch params name:{dataName} , date: from {date.start} to {date.end}, group by {groupby}, max num {maxDisplay}</p> */}
            <div className="grid grid-cols-6 gap-4">
                <BigCardProvider query={query}>
                    {children}
                </BigCardProvider>
            </div>
        </div>

    );
}
