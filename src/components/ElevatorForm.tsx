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
    <div className="p-4 mt-4 mb-4 border rounded-lg shadow-md bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Elevator #L{elevator.id}</h3>
        <div>
          <button onClick={() => onToggleCollapse(elevator.id)} className="px-3 py-1 text-sm text-white bg-gray-400 rounded-md hover:bg-gray-500 mr-2">
            {elevator.isCollapsed ? 'Expand' : 'Collapse'}
          </button>
          <button onClick={() => onRemove(elevator.id)} className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600">Remove</button>
        </div>
      </div>
      {!elevator.isCollapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Basic Info */}
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
            <label className="block text-sm font-medium text-gray-700">Qty</label>
            <input type="number" name="qty" value={elevator.qty} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          
          {/* Price Info */}
          <div className="sm:col-span-2">
            <div className="grid grid-cols-2 gap-4 p-4 mt-4 border rounded-lg bg-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                <input type="number" name="unitPrice" value={elevator.unitPrice} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Price</label>
                <p className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-200">
                  {(elevator.unitPrice * elevator.qty).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
              </div>
            </div>
          </div>

          {/* Basic Specification */}
          <div className="sm:col-span-2"><h4 className="text-md font-semibold mt-4 border-b">Basic Specification</h4></div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Traction motor & Drive</label>
            <input name="tractionMotorAndDrive" value={elevator.tractionMotorAndDrive} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Car Group</label>
            <input name="carGroup" value={elevator.carGroup} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Floors/Stops</label>
            <input name="floorsStops" value={elevator.floorsStops} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Serving floors</label>
            <input name="servingFloors" value={elevator.servingFloors} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Car Entrances</label>
            <input name="carEntrances" value={elevator.carEntrances} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Power voltage</label>
            <input name="powerVoltage" value={elevator.powerVoltage} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lighting voltage</label>
            <input name="lightingVoltage" value={elevator.lightingVoltage} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <input name="frequency" value={elevator.frequency} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Machine room location</label>
            <input name="machineRoomLocation" value={elevator.machineRoomLocation} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Auto Rescue Device</label>
            <input name="autoRescueDevice" value={elevator.autoRescueDevice} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Roping system</label>
            <input name="ropingSystem" value={elevator.ropingSystem} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Inverter & control board</label>
            <input name="inverterAndControlBoard" value={elevator.inverterAndControlBoard} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Controller box</label>
            <input name="controllerBox" value={elevator.controllerBox} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>

          {/* Shaft Specification */}
          <div className="sm:col-span-2"><h4 className="text-md font-semibold mt-4 border-b">Shaft Specification</h4></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shaft construction</label>
            <input name="shaftConstruction" value={elevator.shaftConstruction} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Machine Room Height</label>
            <input name="machineRoomHeight" value={elevator.machineRoomHeight} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shaft Width (mm)</label>
            <input type="number" name="shaftWidth" value={elevator.shaftWidth} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Shaft Depth (mm)</label>
            <input type="number" name="shaftDepth" value={elevator.shaftDepth} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Travel (mm)</label>
            <input type="number" name="travel" value={elevator.travel} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pit depth (mm)</label>
            <input type="number" name="pitDepth" value={elevator.pitDepth} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Overhead (mm)</label>
            <input type="number" name="overhead" value={elevator.overhead} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>

          {/* Car Specification */}
          <div className="sm:col-span-2"><h4 className="text-md font-semibold mt-4 border-b">Car Specification</h4></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">COP Plate</label>
            <input name="copPlate" value={elevator.copPlate} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Car Width (mm)</label>
            <input type="number" name="carWidth" value={elevator.carWidth} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Car Depth (mm)</label>
            <input type="number" name="carDepth" value={elevator.carDepth} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Car Height (mm)</label>
            <input type="number" name="carHeight" value={elevator.carHeight} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Car Ceiling</label>
            <input name="carCeiling" value={elevator.carCeiling} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Car Floor</label>
            <input name="carFloor" value={elevator.carFloor} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Handrail</label>
            <input name="handrail" value={elevator.handrail} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Left Car Wall</label>
            <input name="leftCarWall" value={elevator.leftCarWall} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Right Car Wall</label>
            <input name="rightCarWall" value={elevator.rightCarWall} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rear Car Wall</label>
            <input name="rearCarWall" value={elevator.rearCarWall} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ElevatorForm;
