import { createContext, useState, Dispatch, SetStateAction } from "react";
import { GradeCalc } from "./types";

export interface AppContextProps{
    cgpa: number,
    name: string
    setName: Dispatch<SetStateAction<string>>
    matno: string
    setMatNo: Dispatch<SetStateAction<string>>
    level: number
    setLevel: Dispatch<SetStateAction<number>>
    levelArr: number[],
    gradeCalc: GradeCalc[],
    setCgpa: Dispatch<SetStateAction<number>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [cgpa, setCgpa] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [matno, setMatNo] = useState<string>('');
    const [level, setLevel] = useState<number>(0)
    const levelArr = [100, 200, 300, 400]
    const gradeCalc = [
        {
            grade: 'A',
            gradePoint: 5.0
        },
        {
            grade: 'B',
            gradePoint: 4.0
        },
        {
            grade: 'C',
            gradePoint: 3.0
        },
        {
            grade: 'D',
            gradePoint: 2.0
        },
        {
            grade: 'E',
            gradePoint: 1.0
        },
        {
            grade: 'F',
            gradePoint: 0.00
        },
    ]

    return (
        <AppContext.Provider value={{ cgpa, name, setName, matno, setMatNo, level, setLevel, levelArr, gradeCalc, setCgpa }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;