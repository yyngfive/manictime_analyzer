'use client';

import { bigCardContext } from "./BigCardContext";
import useSWR from 'swr';
import { useContext } from "react";
import { SimpleBar, TinyArea } from "./CardCharts";

const fetcher = async (args) => {
    const [api, params] = args;
    const url = `${api}?${new URLSearchParams(params).toString()}`;
    const headers = { 'token': 'asante' };
    const res = await fetch(url, { headers });
    return await res.json();
};

// 4x2 normal card
function Card({ title }) {

    const query = useContext(bigCardContext);

    const { data, error, isLoading } = useSWR([query.api, query.params], fetcher);

    let Bar;

    /* console.log(data, error, isLoading, query.api); */
    if (data && data['data']) {
        const data_set = JSON.parse(data['data']);
        const data_info = JSON.parse(data['data_info']);
        Bar = <SimpleBar
            data={data_set}
            x={data_info.x}
            y={data_info.y}
            xlab={query.params.groupby}
            ylab='Duration(hour)'
        />;
    }

    return (
        <div className="card bg-base-100 shadow-xl col-span-4 row-span-2">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {
                    error && <div>failed to load</div>
                }{
                    isLoading && <span className="loading loading-spinner loading-sm"></span>
                }
            </div>

            <div className="h-full min-h-[250px]">
                {Bar}
            </div>
        </div>

    );
}

//1x1 small card
function SmallCard({ title, type }) {

    const query = useContext(bigCardContext);

    const { data, error, isLoading } = useSWR([query.api, query.params], fetcher);

    var statValue = '';
    var statDesc = '';
    const unit = 'h' + '(s)';
    if (data && data['data_info']) {
        const data_info = JSON.parse(data['data_info']);
        statValue = `${data_info[type]} `;
        if (type === 'avg') {
            statDesc = 'per ' + `${query.params.groupby}`;
        }
        if (type === 'max') {
            statDesc = data_info.max_days.toString();
        }
    }


    return (
        <div className="card bg-base-100 shadow-xl place-content-end">


            {
                isLoading && <div className="card-body">
                    <span className="loading loading-spinner loading-sm"></span></div>
            }
            {

                data && data['data_info'] && <div className="stats">
                    <div className="stat">
                        <div className="stat-title">{title}</div>
                        <div className="stat-value flex flex-row gap-1">
                            {statValue}
                            <p className="text-sm place-self-end">{unit}</p>
                        </div>
                        
                        <div className="stat-desc">
                            {statDesc}
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

//2x2 medium card
function MediumCard({ title, type }) {
    const query = useContext(bigCardContext);

    const { data, error, isLoading } = useSWR([query.api, query.params], fetcher);

    var CardView;

    if (data && data['data']) {
        const data_set = JSON.parse(data['data']);
        const data_info = JSON.parse(data['data_info']);
        if (type === 'chart') {
            CardView = <div className="h-full"><TinyArea
                data={data_set}
                y={data_info.y}
            /></div>;
        } else if (type === 'top2') {
            const top2 = JSON.parse(data_info['top2']);
            console.log(top2);
            const unit = 'h' + '(s)';
            CardView = <div className="stats">
                {top2.map((e, i) => (
                    <div className="stat" key={i}>
                        <div className="stat-title">Top {i + 1}</div>
                        <div className="stat-value">{e.Duration} <p className="text-sm">{unit}</p></div>
                        <div className="stat-desc">{e.Process}</div>
                    </div>
                ))}
            </div>;
        }

    }

    return (

        <div className="card bg-base-100 shadow-xl col-span-2 place-content-end" >


            {(title || isLoading) && <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {
                    isLoading && <span className="loading loading-spinner loading-sm"></span>
                }

            </div>}
            {CardView}
        </div>
    );
}

export {
    Card,
    SmallCard,
    MediumCard,
};