import { API_root, localite_root, projet_root } from "@/constants/api"
import axios from "axios"

export default class MainService{

    constructor(){
    }

    static getAllLocalites = async () => {
        const response = await axios.get(API_root + localite_root)
        return response?.data
    }

    static addODDToProject = async(projectId: string | number, oddId: string | number) => {
        const response = await axios.post(API_root + projet_root + `/${projectId}/${oddId}`)
        return response?.data
    }

    static removeODDFromProject = async(projectId: string | number, oddId: string | number) => {
        const response = await axios.delete(API_root + projet_root + `/${projectId}/${oddId}`)
        return response?.data
    }
}


