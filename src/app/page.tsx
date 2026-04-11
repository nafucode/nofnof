"use client";

import { useState, useMemo } from 'react';

export default function Home() {
  const [companyName, setCompanyName] = useState('');
  const [quotationNo, setQuotationNo] = useState('');
  const [projectName, setProjectName] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState('');
  const [speed, setSpeed] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [qty, setQty] = useState(1);

  const total = useMemo(() => {
    return unitPrice * qty;
  }, [unitPrice, qty]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* 左侧 */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quotation No</label>
                <input
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Quotation No"
                  value={quotationNo}
                  onChange={(e) => setQuotationNo(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loading</label>
                <input
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Loading"
                  value={loading}
                  onChange={(e) => setLoading(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Speed</label>
                <input
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Speed"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Unit Price"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Qty</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Qty"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* 右侧 */}
          <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-md mt-4 md:mt-0">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Quotation</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Company:</span> {companyName}</p>
              <p><span className="font-semibold">Quotation No:</span> {quotationNo}</p>
              <p><span className="font-semibold">Project Name:</span> {projectName}</p>
              <p><span className="font-semibold">Type:</span> {type}</p>
              <p><span className="font-semibold">Loading:</span> {loading}</p>
              <p><span className="font-semibold">Speed:</span> {speed}</p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-lg font-bold text-right">Total: {total.toFixed(2)} USD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
