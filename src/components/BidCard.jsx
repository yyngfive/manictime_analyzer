'use client';
import { useContext,useState } from "react";
import { dateContext } from "./DashBoardContext";
import BigCardProvider from "./BigCardContext";
import { bigCardContext } from "./BigCardContext";
import useSWR from 'swr';


const fetcher = async (args) => {
    const [api, params] = args;
    const url = `${api}?${new URLSearchParams(params).toString()}`;
    const headers = { 'token': 'asante' };
    const res = await fetch(url, { headers });
    return await res.json();
};

export function Card() {

    const query = useContext(bigCardContext);


    const { data, error, isLoading } = useSWR([query.api, query.params], fetcher);


    console.log(data, error, isLoading, query.api);
    if (data && data['data']) {
        console.log(JSON.parse(data['data']));
    }

    //BUG Hide bugs caused by recharts(no significant influence)
    console.error = (...args) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return (
        <div className="card w-31 bg-base-100 shadow-xl">

            <div className="card-body">
                <h2 className="card-title">Time</h2>
                {
                    error && <div>failed to load</div>
                }{
                    isLoading && <div>loading...</div>
                }{
                    data && data['data'] && <div className="h-60">
                        {data['data']}
                    </div>

                }

            </div>
        </div>
    );
}


export default function BigCard({ children, title, type = 'time', dataName }) {

    const date = useContext(dateContext);
    const [groupby, setGroupby] = useState('Day'); //Day Week Month Year
    const [maxDisplay, setMaxDisplay] = useState(type === 'num' ? 5 : 0); // 1 5 10 25,0 for type time

    const query = {
        api: `/api/manic/${dataName}`,
        params: {
            dateRange: JSON.stringify(date),
            groupby: groupby,
            maxDisplay: maxDisplay,
        }
    };

    return (
        <div>
            <div className="flex flew-row mt-5 mx-1">
                <div className="flex-none w-50 place-self-end">
                    <h2 className="font-sans text-3xl font-black mx-2">{title}</h2>
                </div>
                <div className="flex flex-row justify-end gap-4 w-full mr-2">
                    {
                        type === 'num' &&
                        <div className="form-control w-30 max-w-xs" key='num'>
                            <label className="label">
                                <span className="label-text">Max Display</span>

                            </label>
                            <select className="select select-bordered" defaultValue={5} onChange={(value) => {
                                setMaxDisplay(value.target.value);
                            }}>
                                <option>{1}</option>
                                <option>{5}</option>
                                <option>{10}</option>
                                <option>{25}</option>
                            </select>
                        </div>
                    }
                    <div className="form-control w-30 max-w-xs" key='time'>
                        <label className="label">
                            <span className="label-text">Group By</span>

                        </label>
                        <select className="select select-bordered" defaultValue='Day' onChange={(value) => {
                            setGroupby(value.target.value);
                        }}>
                            <option>Day</option>
                            <option>Week</option>
                            <option>Month</option>
                            <option>Year</option>
                        </select>
                    </div>
                </div>

            </div>
            <div className="divider"></div>
            <p>fetch params name:{dataName} , date: from {date.start} to {date.end}, group by {groupby}, max num {maxDisplay}</p>
            <div>
                <BigCardProvider query={query}>
                    {children}
                </BigCardProvider>
            </div>
        </div>

    );
}
