import { FetchJobOffersService } from "../../Services/FetchJobsOffersService"

const UseJobOffers = () =>{

    const FecthallJobOffers = async (filterName, locationFilter) =>{
        try{
            const response = await  FetchJobOffersService()
            const data = await response.data;
          

            if (!filterName.trim() && !locationFilter.trim()) {
                return data;
            }
            
            const filteredData = data.filter(offer => {
                const matchesTitle = offer.title.toLowerCase().startsWith(filterName.toLowerCase());
                const matchesCity = offer.City.name.toLowerCase().startsWith(locationFilter.toLowerCase());

                return (matchesTitle && matchesCity);
            });

    
            return filteredData;

        }catch(error){
        }
    }

    return {FecthallJobOffers}

}

export default UseJobOffers
