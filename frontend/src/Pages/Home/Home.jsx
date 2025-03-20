import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { AuthContext } from '../../Context/AuthContext'
import { useLocation } from 'react-router-dom';
import SuccessToast from '../../Components/Alerts/Toasts/SuccessToast';
import JobCard from '../../Components/Cards/JobCard/JobCard';
import InfiniteScroll from '../../Components/InfiniteScroll/InfiniteScroll';
import SearchText from '../../Components/FilterBar/SearchText';
import { MapPin, Pin, Search } from 'lucide-react';
import BgButton from '../../Components/BgButton/BgButton';
import SearchHomeContainer from '../../Components/FilterBar/SearchHomeContainer';
import UseJobOffers from '../../Hooks/JobOffers/UseJoboffers';

const Home = () => {

  const location = useLocation();

  const { logged, message } = location.state || {};

  const firstloged = localStorage.getItem('FirstLogin')
  const [showToast, setShowToast] = useState(false);

  const [filterName, SetFilterName] = useState('');
  const [locationFilter, SetlocationFilter] = useState('');


  useEffect(() => {
    if (logged && firstloged === 'Logeado') {
      setShowToast(true);
      localStorage.removeItem('FirstLogin');

    }
  }, [logged, firstloged]);



  const [jobsOffers, setJobsOffers] = useState(
    [
      {
        ID_offer: 1,
        title: "Desarrollador Frontend React",
        User: { ID_user: 101, name: "Tech Solutions" },
        City: { name: "Buenos Aires" },
        Modality: { name: "Remoto" },
        description: "<p>Buscamos un desarrollador con experiencia en React y TypeScript.</p>"
      },
      {
        ID_offer: 2,
        title: "Analista de Datos",
        User: { ID_user: 102, name: "Data Corp" },
        City: { name: "Madrid" },
        Modality: { name: "Híbrido" },
        description: "<p>Se requiere experiencia en SQL y Python para análisis de datos.</p>"
      },
      {
        ID_offer: 3,
        title: "Diseñador UX/UI",
        User: { ID_user: 103, name: "Creative Studio" },
        City: { name: "Barcelona" },
        Modality: { name: "Presencial" },
        description: "<p>Únete a nuestro equipo y diseña experiencias de usuario increíbles.</p>"
      },
      {
        ID_offer: 4,
        title: "Project Manager IT",
        User: { ID_user: 104, name: "Agile Solutions" },
        City: { name: "México DF" },
        Modality: { name: "Remoto" },
        description: "<p>Gestión de proyectos tecnológicos con metodologías ágiles.</p>"
      },
      {
        ID_offer: 5,
        title: "Ingeniero DevOps",
        User: { ID_user: 105, name: "Cloud Innovators" },
        City: { name: "Lima" },
        Modality: { name: "Remoto" },
        description: "<p>Automatización y CI/CD en entornos de nube.</p>"
      },
      {
        ID_offer: 6,
        title: "Administrador de Redes",
        User: { ID_user: 106, name: "SecureTech" },
        City: { name: "Bogotá" },
        Modality: { name: "Presencial" },
        description: "<p>Gestión y mantenimiento de redes empresariales.</p>"
      },
      {
        ID_offer: 7,
        title: "QA Tester",
        User: { ID_user: 107, name: "TestSoft" },
        City: { name: "Santiago" },
        Modality: { name: "Híbrido" },
        description: "<p>Pruebas automatizadas y manuales para aplicaciones web.</p>"
      },
      {
        ID_offer: 8,
        title: "Especialista en Ciberseguridad",
        User: { ID_user: 108, name: "CyberShield" },
        City: { name: "Montevideo" },
        Modality: { name: "Remoto" },
        description: "<p>Seguridad informática y respuesta a incidentes.</p>"
      },
      {
        ID_offer: 9,
        title: "Desarrollador Backend Node.js",
        User: { ID_user: 109, name: "Backend Masters" },
        City: { name: "Buenos Aires" },
        Modality: { name: "Híbrido" },
        description: "<p>Desarrollo de APIs con Node.js y Express.</p>"
      },
      {
        ID_offer: 10,
        title: "Especialista en Marketing Digital",
        User: { ID_user: 110, name: "MarketPro" },
        City: { name: "Ciudad de México" },
        Modality: { name: "Presencial" },
        description: "<p>Estrategias de marketing y redes sociales.</p>"
      }
    ]
  );
  //const { getAllOffers } = JobOffersService()
  // const { FecthallJobOffers } = UseJobOffers();
  // useEffect(() => {
  //   const fetchJobOffers = async () => {
  //     try {
  //       const data = await FecthallJobOffers(filterName, locationFilter);
  //       setJobsOffers(data)

  //     } catch (e) {

  //     }
  //   }

  //   fetchJobOffers();

  // }, [filterName, locationFilter])




  return (
    <div className='Contenido'>

      <nav><Navbar /></nav>

      <main className='page__container'>
        {showToast && (
          <SuccessToast message_toast={message} />
        )}

        <SearchHomeContainer SetFilterName={SetFilterName} SetlocationFilter={SetlocationFilter} />

        <div className='page__container__template home__container'>

          {jobsOffers && jobsOffers.length > 0 ? (
            <InfiniteScroll
              cards={jobsOffers}
            />
          ) :
            (
              <p>No hay ofertas de empleo </p>
            )
          }

        </div>

      </main >
    </div >
  )
}

export default Home