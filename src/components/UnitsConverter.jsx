import React, { useEffect, useState } from 'react';

function UnitsConverter() {
    const [baseValue, setBaseValue] = useState("Length");
    const [units, setUnits] = useState({
        Length: {
            base: "Meter",
            units: {
                Meter: 1,
                Kilometer: 1000,
                Centimeter: 0.01,
                Millimeter: 0.001,
                Mile: 1609.34,
                Yard: 0.9144,
                Foot: 0.3048,
                Inch: 0.0254,
            },
        },

        Mass: {
            base: "Kilogram",
            units: {
                Kilogram: 1,
                Ton: 1000,
                Gram: 0.001,
                Milligram: 0.000001,
                Pound: 0.453592,
                Ounce: 0.0283495,
            },
        },

        Time: {
            base: "Second",
            units: {
                Second: 1,
                Hour: 3600,
                Minute: 60,
                Millisecond: 0.001,
                Microsecond: 0.000001,
                Nanosecond: 0.000000001,
                Day: 86400,
                Week: 604800,
            },
        },

        Volume: {
            base: "Liter",
            units: {
                Liter: 1,
                CubicMeter: 1000,
                Milliliter: 0.001,
                Gallon: 3.78541,
                Quart: 0.946353,
                Pint: 0.473176,
                Cup: 0.24,
                Tablespoon: 0.015,
                Teaspoon: 0.005,
            },
        },

        Temperature: {
            base: "Celsius",
            convert: (value, fromUnit, toUnit) => {
                if (fromUnit === toUnit) return value;
                if (fromUnit === "Celsius" && toUnit === "Fahrenheit") return (value * 9 / 5) + 32;
                if (fromUnit === "Celsius" && toUnit === "Kelvin") return value + 273.15;
                if (fromUnit === "Fahrenheit" && toUnit === "Celsius") return (value - 32) * 5 / 9;
                if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") return (value - 32) * 5 / 9 + 273.15;
                if (fromUnit === "Kelvin" && toUnit === "Celsius") return value - 273.15;
                if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") return (value - 273.15) * 9 / 5 + 32;
                return value;
            },
            units: {
                Celsius: 1,
                Fahrenheit: "special",
                Kelvin: "special",
            },
        },

        Area: {
            base: "SquareMeter",
            units: {
                SquareMeter: 1,
                SquareKilometer: 1000000,
                SquareCentimeter: 0.0001,
                SquareMillimeter: 0.000001,
                Hectare: 10000,
                Acre: 4046.86,
                SquareFoot: 0.092903,
                SquareInch: 0.00064516,
            },
        },
    });
    const [filteredUnits, setFilteredUnits] = useState(Object.keys(units));
    const [filteredUnitsValue, setFilteredUnitsValue] = useState(Object.keys(units["Length"]["units"]));
    const [leftUnit, setLeftUnit] = useState(filteredUnitsValue[0])
    const [rightUnit, setRightUnit] = useState(filteredUnitsValue[0])
    const [fromValue, setFromValue] = useState(1);
    const [toValue, setToValue] = useState(1);

    const filter = (value) => {
        const index = filteredUnits.indexOf(value);
        if (index !== -1) setBaseValue(filteredUnits[index]);
        setFilteredUnitsValue(Object.keys(units[value]["units"]))
    };

    const convertUnits = () => {
        if (isNaN(fromValue) || fromValue === '') {
            alert("Please enter a valid number for the conversion.");
            return;
        }

        if (baseValue === "Temperature") {
            const convertedValue = units[baseValue]["convert"](fromValue, leftUnit, rightUnit);
            setToValue(convertedValue.toFixed(2));
        } else {
            const baseUnitValue = fromValue * units[baseValue]["units"][leftUnit];
            if (baseUnitValue === undefined || isNaN(baseUnitValue)) {
                console.error("Invalid baseUnitValue:", baseUnitValue);
                return;
            }
            const convertedValue = baseUnitValue / units[baseValue]["units"][rightUnit];
            if (isNaN(convertedValue)) {
                console.error("Invalid convertedValue:", convertedValue);
                return;
            }
            setToValue(convertedValue.toFixed(2));
        }
    };

    return (
        <div className="max-w-lg mx-auto rounded-xl p-6 mt-12 shadow-[0px_0px_6px_2px_aqua] ">
            <h2 className="text-xl font-semibold text-white text-center mb-4">Unit Converter</h2>
            <div className="mb-4">
                <label className="block text-white font-medium mb-1">Select Base Quantity:</label>
                <select
                    className="w-full bg-gray-900 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={baseValue}
                    onChange={(e) => { setBaseValue(e.target.value); filter(e.target.value); }}
                >
                    {filteredUnits.map((unit, index) => (
                        <option key={index} value={unit}>{unit}</option>
                    ))}
                </select>
            </div>

            {/* Conversion Section */}
            <div className="grid grid-cols-2 gap-4">
                {/* From Unit */}
                <div>
                    <label className="block text-white font-medium mb-1">From:</label>
                    <select
                        className="w-full bg-gray-900  p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={leftUnit}
                        onChange={(e) => setLeftUnit(e.target.value)}
                    >
                        {filteredUnitsValue.map((unit, index) => (
                            <option key={index} value={unit}>{unit}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        className="w-full p-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={fromValue}
                        onChange={(e) => { setFromValue(e.target.value) }}
                        placeholder="Enter value"
                    />
                </div>

                {/* To Unit */}
                <div>
                    <label className="block text-white font-medium mb-1">To:</label>
                    <select
                        className="w-full bg-gray-900 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={rightUnit}
                        onChange={(e) => setRightUnit(e.target.value)}
                    >
                        {filteredUnitsValue.map((unit, index) => (
                            <option key={index} value={unit}>{unit}</option>
                        ))}
                    </select>
                    <p className="w-full p-2 mt-2 border rounded-lg ">{toValue}</p>
                </div>
            </div>

            {/* Convert Button */}
            <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" onClick={convertUnits}>Convert</button>
            <div className='py-4 text-center'>
                <span className='text-gray-400'> Designed By : </span>
                <span className='text-blue-500 font-bold'>Muhammad Sheraz</span>
            </div>
        </div>
    );
}

export default UnitsConverter;
