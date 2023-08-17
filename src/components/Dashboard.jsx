'use client';

import { RangePicker } from "react-ease-picker";
import { useState } from "react";
import syncLogo from '../../public/images/sync.svg';
import Image from 'next/image';
import DashBoardProvider from "./DashBoardContext";
import { format } from "date-fns";


export default function DashBoard({ children }) {

    const today = format(new Date(), 'yyyy-MM-dd');
    const [date, setDate] = useState({ start: '2023-1-20', end: '2023-2-14' });

    const settings = {
        date: date
    };

    return (
        <>
            <div className="flex justify-end my-2 gap-2">
                <RangePicker className="input input-bordered w-full max-w-xs"
                    onSelect={(start, end) => {
                        setDate({
                            start: start,
                            end, end
                        });
                    }}
                    position="right"
                    format="YYYY-MM-DD"
                    placeholder="Date From ... to ..."
                    calendars={2}
                />
                <button className="btn btn-primary btn-square" onClick={() => {
                    setDate({
                        start: date.start,
                        end: date.end,
                    });
                }}>
                    <Image
                        src={syncLogo}
                        alt='Sync'
                        className="w-5/6"
                    />
                </button>
            </div>
            <DashBoardProvider settings={settings}>
                {children}
            </DashBoardProvider>
        </>
    );
}

