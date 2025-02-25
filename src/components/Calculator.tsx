import { useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";
import Table from "./years/Table";
import { first_semester_yr1 } from "../lib/yearOne";
import { second_semester_yr1 } from "../lib/yearOne";
function Calculator() {
    const [chosenLevel, setChosenLevel] = useState<number>(0)
    const [detailsfilled, setDetailsFilled] = useState<boolean>(false);
    const {name, matno, setName, setMatNo, level, setLevel, levelArr} = useAppContext();

    function handleDetailFormSubmit(e: React.FormEvent){
        e.preventDefault();
        
        // Get the form inputs
        const form = e.target as HTMLFormElement;
        const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
        const matnoInput = form.querySelector('input[name="matno"]') as HTMLInputElement;
        const levelInput = form.querySelector('select[name="level"]') as HTMLSelectElement;
        
        // Update context with the input values
        if (nameInput && matnoInput && levelInput) {
            setName(nameInput.value);
            setMatNo(matnoInput.value);
            setLevel(levelInput.value)
            setDetailsFilled(true)
        }else{
            setDetailsFilled(false)
        }

    } 

    useEffect(()=>{
        console.log(chosenLevel)
        console.log(name, matno)
    }, [chosenLevel, name, matno])
    return ( 
        <>
            <div className="max-cont min-h-[80dvh] flex flex-col items-center justify-center overflow-hidden">
                {/* detaile question box */}
                <form onSubmit={handleDetailFormSubmit} className={`${detailsfilled ? 'hidden' : 'flex'} w-full shadow-md md:w-1/3 mx-auto bg-[#138601] text-white flex-col items-center justify-center p-3 rounded-xl gap-5`}>
                    <h2 className="uppercase text-3xl font-semibold">Student Details</h2>
                    <input type="text" placeholder="Enter Name" className="bg-white text-[#138601] w-full p-3 text-xl rounded-xl" name="name"/>
                    <input type="text" placeholder="Enter Matric Number" className="bg-white text-[#138601] w-full p-3 text-xl rounded-xl" name="matno"/>
                    <select name="level" id="" className="bg-white text-[#138601] w-full p-3 text-xl rounded-xl">
                        <option value="null">Enter Level</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={300}>300</option>
                        <option value={400}>400</option>
                    </select>
                    <button type="submit" className="w-full bg-transparent border-2 p-3 rounded-xl cursor-pointer hover:bg-white hover:text-[#138601] duration-150 ease-in-out">
                        Enter
                    </button>
                </form>
                {/* level question box */}
                <div className={`${detailsfilled ? 'flex' : 'hidden'} w-full shadow-md md:w-1/3 mx-auto bg-[#138601] text-white flex-col items-center justify-center p-3 rounded-xl gap-5`}>
                    <h2 className="uppercase text-3xl font-semibold">Level</h2>
                    <select onChange={(e)=> setChosenLevel(Number(e.target.value))} name="level" id="" className="bg-white text-[#138601] w-full text-center p-3 text-xl">
                        <option value="null">-</option>
                        {levelArr.map((lvl: number, index: number) => {
                            return(
                                <option value={lvl} key={index}>{lvl}</option>
                            )
                        })}
                    </select>
                </div>

                {/* details */}
                <div className={`${detailsfilled ? 'w-full mt-5 block' : 'hidden'}`}>
                    <p className="text-[#138601] font-semibold text-xl md:text-2xl">Name: {name}</p>
                    <p className="text-[#138601] font-semibold text-xl md:text-2xl">MatNo: {matno}</p>
                    <p className="text-[#138601] font-semibold text-xl md:text-2xl">Level: {level}</p>
                </div>
                {/* courses table */}
                {/* year 1 */}
                <div className={`${chosenLevel >= 100 ? 'block' : 'hidden'} w-full mt-5`}>
                    <h2 className="text-[#138601] text-2xl font-semibold uppercase">Year One</h2>
                    <Table
                    tableSemester="First Semester"
                    coursesArr={first_semester_yr1}
                    />
                    <Table
                    tableSemester="Second Semester"
                    coursesArr={second_semester_yr1}
                    />
                </div>
            </div>    
        </>
    );
}

export default Calculator;