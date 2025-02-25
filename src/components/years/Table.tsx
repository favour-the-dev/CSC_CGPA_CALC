import { useAppContext } from "../../context/useAppContext";
import { GradeCalc } from "../../context/types";
import { useEffect, useState } from "react";
import { years } from "../../context/types";

interface TableProps{
    tableSemester: string
    coursesArr: years[]
}

function Table({tableSemester, coursesArr}: TableProps) {
    const { gradeCalc, setCgpa } = useAppContext();
    const [selectedGrades, setSelectedGrades] = useState<{ [key: string]: {gradePoint: number, cu:number} }>({});
    const [cgp, setCgp] = useState<{ [key: string]: number }>({});
    const [cgpA, setCgpA] = useState<{ [key: string]: number }>({});


    // Function to handle grade selection change
    function handleGradeChange(courseCode: string, gradePoint: number, cu: number) {
        setSelectedGrades((prev) => ({
            ...prev,
            [courseCode]: {gradePoint, cu},
        }));

        // Compute CGP based on the newly selected grade
        const newCgp = gradePoint * cu;
        setCgp((prev)=>({
            ...prev,
            [courseCode]: newCgp
        }))
        // Compute CGPA (assuming total credits = cu, modify if needed)
        setCgpA((prev)=>({
            ...prev,
            [courseCode]: newCgp/cu
        }))
    }

    useEffect(() => {
        const totalCGP = Object.values(selectedGrades).reduce((sum, item) => sum + item.gradePoint * item.cu, 0);
        const totalCU = Object.values(selectedGrades).reduce((sum, item) => sum + item.cu, 0);
        setCgpa(totalCU > 0 ? totalCGP / totalCU : 0);
    }, [selectedGrades, setCgpa])

    return (
        <>
            <div className="w-full overflow-x-auto mt-5">
                <h3 className="text-[#138601] text-xl uppercase mb-3">{tableSemester}</h3>
                {/* Table */}
                <table className="w-full border-collapse border border-[#138601]">
                    {/* Table Header */}
                    <thead className="bg-[#138601] text-white text-xs md:text-md">
                        <tr>
                            <th className="p-2 md:p-3 border border-white text-left">Course</th>
                            <th className="p-2 md:p-3 border border-white text-left hidden md:table-cell">Course Title</th>
                            <th className="p-2 md:p-3 border border-white text-left">CU</th>
                            <th className="p-2 md:p-3 border border-white text-left">Grade</th>
                            <th className="p-2 md:p-3 border border-white text-left">GP</th>
                            <th className="p-2 md:p-3 border border-white text-left">CGP</th>
                            <th className="p-2 md:p-3 border border-white text-left">CGPA</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="text-sm md:text-md">
                        {coursesArr.map((year: years)=>{
                            return(
                                <tr className="border border-[#138601]" key={year.id}>
                                    <td className="p-2 md:p-3 border border-[#138601]">{year.course}</td>
                                    <td className="p-2 md:p-3 border border-[#138601] hidden md:table-cell">
                                        {year.courseTitle}
                                    </td>
                                    <td className="p-2 md:p-3 border border-[#138601]">{year.creditUnit}</td>
                                    <td className="p-2 md:p-3 border border-[#138601]">
                                        <select
                                            className="w-full"
                                            onChange={(e) => handleGradeChange(year.course, Number(e.target.value), year.creditUnit)}
                                        >
                                            <option value="">Select</option>
                                            {gradeCalc.map((grade: GradeCalc, index: number) => (
                                                <option value={String(grade.gradePoint)} key={index}>
                                                    {grade.grade}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-2 md:p-3 border border-[#138601]">
                                        {selectedGrades[year.course]?.gradePoint ?? "-"}
                                    </td>
                                    <td className="p-2 md:p-3 border border-[#138601]">
                                        {cgp[year.course] ?? "-"}
                                    </td>
                                    <td className="p-2 md:p-3 border border-[#138601]">
                                        {cgpA[year.course] ?? '-'}
                                    </td>
                                </tr>
                            )
                        })}  
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;