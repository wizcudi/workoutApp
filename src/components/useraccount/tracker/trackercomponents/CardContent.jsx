import React, { useState } from 'react'
import Search from './Search'
import BarcodeScanner from './BarcodeScanner'
import Button from '../../../premade/Button'

export default function CardContent() {
    const [activeTab, setActiveTab] = useState('search'); // 'search' or 'barcode'

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Button 
                    btnText="Search Food"
                    bgColor={activeTab === 'search' ? "bg-color-10-a" : "bg-color-60/20"}
                    onClick={() => setActiveTab('search')}
                    btnTextStyle="font-bold text-color-30"
                />
                <Button 
                    btnText="Scan Barcode"
                    bgColor={activeTab === 'barcode' ? "bg-color-10-a" : "bg-color-60/20"}
                    onClick={() => setActiveTab('barcode')}
                    btnTextStyle="font-bold text-color-30"
                />
            </div>
            {activeTab === 'search' ? <Search /> : <BarcodeScanner />}
            {/* <Search /> */}
            
        </div>
    )
}
