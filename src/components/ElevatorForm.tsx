import React from 'react';

interface ElevatorFormProps {
  elevator: any;
  onChange: (id: number, name: string, value: string | number) => void;
  onRemove: (id: number) => void;
  onToggleCollapse: (id: number) => void;
}

const ElevatorForm: React.FC<ElevatorFormProps> = ({ elevator, onChange, onRemove, onToggleCollapse }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumber = e.target.type === 'number';
    onChange(elevator.id, name, isNumber ? Number(value) : value);
  };

  return (
    <div className="p-4 mb-4 border rounded-lg shadow-md bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Elevator #{elevator.id}</h3>
        <div>
          <button onClick={() => onToggleCollapse(elevator.id)} className="px-3 py-1 text-sm text-white bg-gray-400 rounded-md hover:bg-gray-500 mr-2">
            {elevator.isCollapsed ? 'Expand' : 'Collapse'}
          </button>
          <button onClick={() => onRemove(elevator.id)} className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600">Remove</button>
        </div>
      </div>
      {!elevator.isCollapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input name="description" value={elevator.description} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input name="type" value={elevator.type} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity (kg)</label>
            <input type="number" name="capacity" value={elevator.capacity} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Speed (m/s)</label>
            <input type="number" step="0.01" name="speed" value={elevator.speed} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit Price</label>
            <input type="number" name="unitPrice" value={elevator.unitPrice} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Qty</label>
            <input type="number" name="qty" value={elevator.qty} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          {/* All other specification fields */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Traction motor & Drive</label>
            <input name="tractionMotorAndDrive" value={elevator.tractionMotorAndDrive} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          {/* ... and so on for all fields in elevatorTemplate ... */}
        </div>
      )}
    </div>
  );
};

export default ElevatorForm;
