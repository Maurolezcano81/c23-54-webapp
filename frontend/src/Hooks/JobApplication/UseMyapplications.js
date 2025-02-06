import { useState } from "react";
import { jobApplicationService } from "../../Services/jobApplicationService";


const UseMyapplications = () =>{

    const [data, setData] = useState();
    const {MyapplicationsService} = jobApplicationService();

    const FetchMyApplications = async (filter, idUser) =>{

        try{
            const response = await MyapplicationsService(idUser);
            const data = await response.json();

            if (filter === true) {
                setData(data.filter(offer => ['Pendiente', 'Vista', 'En revisión', 'Aprobada'].includes(offer.ApplicationStatus.status)));
                return data.filter(offer => ['Pendiente', 'Vista', 'En revisión', 'Aprobada'].includes(offer.ApplicationStatus.status));
            } 
            if (filter === false) {
                setData(data.filter(offer => offer.ApplicationStatus.statuss === 'refused'))
                return data.filter(offer => offer.ApplicationStatus.status === 'refused');
            }
            setData(data)
            return data
        }catch(error){

        }
    }

    return {FetchMyApplications, data}
}

export default UseMyapplications;