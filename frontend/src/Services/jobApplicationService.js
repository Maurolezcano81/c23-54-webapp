export const jobApplicationService = () =>{

    const postjobApplication = async (formData) =>{


        const response = await fetch("http://localhost:3001/api/jobApplications", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if(!response){
            throw new Error("Error al postularse")
        }
        console.log(response.json())
        return response.json();
    }

    const MyapplicationsService = async (idUser) =>{
        try{


            const response = await fetch(`http://localhost:3001/api/jobApplications/user/${idUser}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return response;



        }catch(error){

        }
    }

    const DeleteApplicationsService = async (ID_application) =>{

        try{


            const response = await fetch(`http://localhost:3001/api/jobApplications//${ID_application}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return response;



        }catch(error){

        }
    }
    return {postjobApplication, MyapplicationsService, DeleteApplicationsService}
}