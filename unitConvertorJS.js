/*
  _   _       _ _        ____                          _                _ ____  
 | | | |_ __ (_) |_ ___ / ___|___  _ ____   _____ _ __| |_ ___  _ __   | / ___| 
 | | | | '_ \| | __/ _ \ |   / _ \| '_ \ \ / / _ \ '__| __/ _ \| '__|  | \___ \ 
 | |_| | | | | | ||  __/ |__| (_) | | | \ V /  __/ |  | || (_) | | | |_| |___) |
  \___/|_| |_|_|\__\___|\____\___/|_| |_|\_/ \___|_|   \__\___/|_|  \___/|____/                        

--------------------- UnitorJS (version 1.0.0) -------------------------
-----------------------------  SI Unites -------------------------------

    @licstart  The following is the entire license notice for the 
    JavaScript code in this page.

    Copyright (C) 2025  Louis Emery

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.   


    @licend  The above is the entire license notice
    for the JavaScript code in this page.
*/
/*
Use Convertor ([type,fromUnit,toUnit,Value]) for basic conversion
Use GetType -> return array of all type
Use GetUnit(type) -> return array of all unit for this type
For a Input 
new UniteForm({parent,id,className,text('none' if you dont want text info)})
for a input convertor in -> out
.SetInput({type,toUnit,dftUnit}) you can add a .addEventListener("valueUpdated", (e) => e.detail) (e.detail will return array)


.OutputVal ([type,fromUnit,Val]) or juste put e.detail from SetInput
.OutputDftUnit (dftUnit)
*/
//#region Table
const Table = {
    'length': {
        "nm": 1e-9,      // nanometer (1 nm = 10^-9 meters)
        "μm": 1e-6,      // micrometer or micron (1 μm = 10^-6 meters)
        "mm": 1e-3,      // millimeter (1 mm = 0.001 meters)
        "cm": 1e-2,      // centimeter (1 cm = 0.01 meters)
        "dm": 1e-1,      // decimeter (1 dm = 0.1 meters)
        "m": 1,          // meter (base unit of length in the metric system)
        "km": 1e3,       // kilometer (1 km = 1000 meters)
    },
    'square': {
        "nm²": 1e-18,    // square nanometer
        "μm²": 1e-12,    // square micrometer
        "mm²": 1e-6,     // square millimeter
        "cm²": 1e-4,     // square centimeter
        "dm²": 1e-2,     // square decimeter
        "m²": 1,         // square meter
        "are": 1e2,      // are (1 are = 100 m²)
        "ha": 1e4,       // hectare (1 ha = 10,000 m²)
        "km²": 1e6,      // square kilometer
    },
    'volume': {
        "nm³": 1e-27,    // cubic nanometer
        "μm³": 1e-18,    // cubic micrometer
        "mm³": 1e-9,     // cubic millimeter
        "cm³": 1e-6,     // cubic centimeter
        "dm³": 1e-3,     // cubic decimeter
        "m³": 1,         // cubic meter
        "L": 1e-3,       // liter (1 L = 1 dm³)
    },
    'temperature': {
        "°C": {
            "°C": (value) => value,                  // Celsius to Celsius
            "K": (value) => value + 273.15,         // Celsius to Kelvin
            "F": (value) => (value * 9/5) + 32,     // Celsius to Fahrenheit
        },
        "K": {
            "°C": (value) => value - 273.15,         // Kelvin to Celsius
            "K": (value) => value,                  // Kelvin to Kelvin
            "F": (value) => (value - 273.15) * 9/5 + 32, // Kelvin to Fahrenheit
        },
        "F": {
            "C": (value) => (value - 32) * 5/9,     // Fahrenheit to Celsius
            "K": (value) => (value - 32) * 5/9 + 273.15, // Fahrenheit to Kelvin
            "F": (value) => value,                  // Fahrenheit to Fahrenheit
        }
    },
    'velocity': {
        "nm/s": 1e-9,    // nanometer per second
        "μm/s": 1e-6,    // micrometer per second
        "mm/s": 1e-3,    // millimeter per second
        "cm/s": 1e-2,    // centimeter per second
        "dm/s": 1e-1,    // decimeter per second
        "m/s": 1,        // meter per second
        "km/s": 1e3,     // kilometer per second
        "m/min": 1/60,   // meter per minute
        "km/h": 1/3.6,   // kilometer per hour
    },
    'massFlowRate': {
        "kg/s": 1,        // kilogram per second
        "g/s": 1e-3,      // gram per second
        "kg/min": 1/60,   // kilogram per minute
        "kg/h": 1/3600,   // kilogram per hour
    },
    'volumetricFlowRate': {
        "m³/s": 1,        // cubic meter per second
        "L/s": 1e-3,      // liter per second
        "m³/min": 1/60,   // cubic meter per minute
        "m³/h": 1/3600,   // cubic meter per hour
    },
    'energy': {
        "J": 1,           // Joule
        "kJ": 1e3,        // kilojoule
        "MJ": 1e6,        // megajoule
        "GJ": 1e9,        // gigajoule
        "Wh": 3600,       // watt-hour
        "kWh": 3.6e6,     // kilowatt-hour
        "MWh": 3.6e9,     // megawatt-hour
        "GWh": 3.6e12,    // gigawatt-hour
    },
    'specificEnthalpy': {
        "J/kg": 1,        // Joule per kilogram
        "kJ/kg": 1e3,     // kilojoule per kilogram
        "MJ/kg": 1e6,     // megajoule per kilogram
    },
    'power': {
        "W": 1,           // Watt
        "kW": 1e3,        // kilowatt
        "MW": 1e6,        // megawatt
        "GW": 1e9,        // gigawatt
        "HP": 745.7,      // horsepower
    },
    'time':{
        "ms": 1e-3,
        "s": 1,
        "min": 60,
        "h": 3600,
        "day": 86400,
    }
};
//#endregion

//#region MainFonction
export function Convertor (i) {

    if (i.length !== 4) {
        console.error(`Error false input ${i}`);
        return null;
    };

    let Type, fromUnit, toUnit, Value, fromFactor, toFactor;

    Type = i[0];
    fromUnit = i[1];
    fromFactor = Table[Type][fromUnit];
    toUnit = i[2];
    toFactor = Table[Type][toUnit];
    Value = parseFloat(i[3]);
    if (!CheckUnit(Type,fromUnit)) {console.error(`FromUnit: ${fromUnit} dont correspond of the type : ${Type} `); return null};
    if (!CheckUnit(Type,toUnit)) {console.error(`toUnit: ${toUnit} dont correspond of the type : ${Type} `); return null};

    if(Type === 'temperature') {
        const conversionFunction = Table[Type][fromUnit][toUnit];
        if (typeof conversionFunction === 'function') {
            return conversionFunction(Value);
        } 
    } else {
        return parseFloat((Value*fromFactor/toFactor).toFixed(10))
    }
};

export function GetType () {
    return Object.keys(Table);
};

export function GetUnit (type) {
    if (Table[type]) {
        // Retourne les clés (unités) pour le type donné
        return Object.keys(Table[type]);
    } else {
        // Si le type n'existe pas, retourne un message d'erreur
        return `Type "${type}" not found in the table.`;
    }
};
//#endregion

function CheckUnit (type,unit) {
    return unit in Table[type];
};

function CheckType (type) {
    return type in Table
};

//#region  Unite Formular
export class UnitForm extends EventTarget {
    IsAInput = false;
    IsAOutput = false;
    
    Type = null
    fromUnit = null
    toUnit = null
    dftUnit = null
    InfoTextValue = null

    InValue = null
    OutValue = null

    constructor ({parent,id,className,text}) {
        super();

        this.parent = parent instanceof HTMLElement ? parent : document.querySelector('body');
        this.id = id;
        this.className = className;
        this.textPerso = text
        this.#CreatContainer();
    };
    SetInput ({type,toUnit,dftUnit}) {
        this.IsAInput = true;
        this.IsAOutput = false;
        this.Type = type || console.error('[SetInputForm]You have to specified type');
        this.toUnit = toUnit || dftUnit || console.error('[SetInputForm]You have to specified the toUnit or dftUnit');
        this.dftUnit = dftUnit || toUnit || console.error('[SetInputForm]You have to specified the dftUnit or toUnit');
        
        if (!CheckUnit(this.Type,this.toUnit)) {console.error(`to Unit doesnt correpond ok the type`); return}
        if (!CheckUnit(this.Type,this.dftUnit)) {console.error(`to Unit doesnt correpond ok the type`); return}
        this.#Setup()
    };
    OutputDftUnit (i) {
        this.dftUnit = i;
    };
        OutputVal (i) {
        if (i.length !== 3) {console.alert(`[OutputVal] value is not a array with ['type','fromUnit',Value]->${i}`); return}
        this.IsAOutput = true;
        this.IsAInput = false;
        let Itype,IfromUnit
        Itype = i[0];
        IfromUnit = i[1]
        this.InValue = parseFloat(i[2])

        if (!CheckType(Itype)) {console.error(`Type is not valide`); return}
        if (!CheckUnit(Itype,IfromUnit)) {console.error(`to Unit doesnt correpond ok the type`); return}

        if (this.Type !== Itype && this.fromUnit !== IfromUnit) { //escape Setup process
        this.Type = Itype;
        this.fromUnit = IfromUnit;
        if (!CheckUnit(Itype,this.dftUnit)){this.dftUnit = IfromUnit}
        this.#Setup()
        }
        this.#UpdateValue()

    };
        #CreatContainer () {
            if (this.container) {return}
            this.container = document.createElement("div");
            if (this.id !== undefined) {
                this.container.id = this.id;
            };
            if (this.className !== undefined) {
                this.container.className = this.className;
            };
            this.parent.appendChild(this.container);

            this.head = document.createElement("div");
            this.head.className = "head"
            this.container.appendChild(this.head);

            this.foot = document.createElement("div");
            this.foot.className = "foot"
            this.container.appendChild(this.foot)
        };
        #Setup () {
            this.#CreatTextInfo()
            this.#CreatInput()
            this.#CreatSelect();
        }
            #CreatTextInfo () {
                if (this.textPerso) {
                    this.InfoTextValue = this.textPerso
                }else{
                    this.InfoTextValue = undefined
                }
                if (this.InfoTextValue === 'none') {
                    if (this.InfoText) {
                        this.head.removeChild(this.InfoText)
                    };
                    return
                };
                if (this.InfoTextValue === undefined) {
                    if (this.IsAInput) {
                        this.InfoTextValue = `Input ${this.Type} :`
                    }
                    if (this.IsAOutput) {
                        this.InfoTextValue = `Output ${this.Type} :`
                    }

                };
                if (this.InfoText) {
                    this.InfoText.innerHTML = this.InfoTextValue;
                } else {
                    this.InfoText = document.createElement("p");
                    this.InfoText.innerHTML = this.InfoTextValue;
                    this.head.appendChild(this.InfoText);
                }
            };
            #CreatInput () {
                if (this.input) {
                    if (this.IsAOutput) {
                        this.input.readOnly = true;
                    } else {
                        this.input.readOnly = false;
                    }
                    return     
                };

                this.input = document.createElement("input");
                this.input.type = "number";
                if (this.IsAOutput) {
                    this.input.readOnly = true;
                }
                this.foot.appendChild(this.input);
                this.input.addEventListener("input", () => this.#UpdateValue());
            };
            #CreatSelect () {
                if (this.select) {
                    this.foot.removeChild(this.select);
                };
                this.select = document.createElement("select");
                let UnitTable = Table[this.Type]
                for (const unit in UnitTable) {
                    if (UnitTable.hasOwnProperty(unit)) {
                        const option = document.createElement("option");
                        option.value = unit;
                        option.textContent = unit;
                        if (this.dftUnit === unit) {
                            option.selected = true;
                        };
                        this.select.appendChild(option);
                    };
                };
                this.foot.appendChild(this.select);

                this.select.addEventListener("change", () => this.#UpdateValue());
            }




    #UpdateValue() {
        if (this.IsAInput) {
            this.fromUnit = this.select.value;
            let i = parseFloat(this.input.value);
            
            if (isNaN(i)) {
                this.input.setCustomValidity("Entrez un nombre valide");
                this.input.reportValidity();
                return;
            };
            let decimalPart = this.input.value.split('.')[1];
            if (decimalPart && decimalPart.length > 4) {
                this.input.value = i.toFixed(3);
                return;
            };
            this.InValue = i;

        };
        if (this.IsAOutput) {
            this.toUnit = this.select.value
        };

        let val = []

        val.push(this.Type)
        val.push(this.fromUnit)
        val.push(this.toUnit)
        val.push(this.InValue)
        this.OutValue = Convertor(val)
        if (this.IsAOutput) {
            this.input.value = this.OutValue
        }
        if (this.IsAInput) {
            const updateEvent = new CustomEvent("valueUpdated", {
                detail: [this.Type,this.toUnit,this.OutValue]
            });
            this.dispatchEvent(updateEvent);
        }
    };

};
//#endregion
