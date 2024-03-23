import React from 'react'
import { Header } from '../components/Header'
import { CalendarLeftSide } from '../components/CalendarLeftSide'
import { Outlet } from 'react-router'

export const RootHomeLayout = () => {
    return (
        <div>
            <div className="border-b mb-2">
                <Header />
            </div>
            <div className="flex h-[calc(100vh-73px)] mr-3">
                <div className="min-w-[256px] max-w-[256px] p-4 mr-3">
                    <CalendarLeftSide />
                </div>
                <Outlet />
            </div>
        </div>
    )
}