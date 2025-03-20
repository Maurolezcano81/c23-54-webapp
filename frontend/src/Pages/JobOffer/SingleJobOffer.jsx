import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { JobOffersService } from "../../Services/JobOffersService";
import { Calendar, CircleDollarSign, Laptop, MapPin, User, UserRound } from "lucide-react";
import UseJobApplication from "../../Hooks/JobApplication/UseJobApplication";
import Navbar from "../../Components/Navbar/Navbar";
import AlertToast from "../../Components/Alerts/Toasts/AlertToast";
import Loader from "../../Components/Loader/Loader";
import { AuthContext } from "../../Context/AuthContext";


const SingleJobOffer = () => {

    const { ID_offer } = useParams();
    const { getOfferById } = JobOffersService();
    const [singleOffer, setSingleOffer] = useState({
        ID_offer: 1,
        title: "🚀 Desarrollador Full Stack (React & Node.js) 💻",
        User: {
            ID_user: 101,
            name: "Juan Pérez - Tech Solutions"
        },
        City: {
            name: "🌍 Buenos Aires / Remoto"
        },
        Modality: {
            name: "📡 100% Remoto"
        },
        deadline: "2024-12-31T23:59:59.999Z",
        description: `
            <p>🎯 <strong>¡Únete a nuestro equipo en Tech Solutions!</strong></p>
            <p>Estamos en la búsqueda de un <strong>Desarrollador Full Stack</strong> con experiencia en tecnologías modernas para formar parte de un equipo dinámico y en constante crecimiento. Si eres apasionado por la tecnología y quieres trabajar en proyectos innovadores, esta oportunidad es para ti. 🚀</p>
            
            <h4>✨ ¿Qué harás en este rol?</h4>
            <ul>
                <li>⚙️ Desarrollar y mantener aplicaciones web utilizando <strong>React.js</strong> y <strong>Node.js</strong>.</li>
                <li>🛠️ Diseñar y optimizar APIs RESTful.</li>
                <li>📊 Colaborar con el equipo de diseño para mejorar la experiencia de usuario.</li>
                <li>🔍 Implementar buenas prácticas de desarrollo y testing.</li>
                <li>🗂️ Participar en revisiones de código y sesiones de planificación Agile.</li>
            </ul>
    
            <h4>📌 Requisitos</h4>
            <ul>
                <li>✅ Experiencia mínima de 2 años en <strong>React.js</strong> y <strong>Node.js</strong>.</li>
                <li>✅ Conocimientos en bases de datos <strong>MySQL / PostgreSQL</strong>.</li>
                <li>✅ Experiencia con herramientas de versionado (<strong>Git</strong>).</li>
                <li>✅ Capacidad para trabajar en equipo y resolver problemas de manera autónoma.</li>
            </ul>
    
            <h4>🎁 Beneficios</h4>
            <ul>
                <li>🏠 Modalidad <strong>100% remota</strong> con horario flexible.</li>
                <li>💰 <strong>Salario competitivo</strong> acorde a tu experiencia.</li>
                <li>📚 Acceso a cursos y capacitaciones.</li>
                <li>🎉 Días libres adicionales y ambiente de trabajo relajado.</li>
                <li>🖥️ Equipamiento y herramientas necesarias para tu desempeño.</li>
            </ul>
    
            <p>📩 <strong>Si te interesa esta oportunidad, aplica ahora y forma parte de nuestro equipo!</strong></p>
        `,
        salary_range_min: 1500,
        salary_range_max: 3000
    });
    const { Role, idUser } = useContext(AuthContext)

    const { applyjob, error } = UseJobApplication();

    const [isLoading, setIsLoading] = useState(false)
    const [errorLoading, setErrorLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const ApplicationsList = lazy(() => import('../../Components/ApplicationsTable/ApplicationsList'));

    // useEffect(() => {
    //     const getData = async (ID_offer) => {
    //         if (isLoading) {
    //             const response = await getOfferById(ID_offer)

    //             if (response.status === 400 || response.status === 403) {
    //                 setIsLoading(false);
    //                 setErrorLoading(true);
    //                 setErrorMessage("Ha ocurrido un error al cargar la oferta de empleo, intente nuevamente más tarde")
    //                 return
    //             }

    //             setIsLoading(false);
    //             setSingleOffer(response.data)
    //         }

    //     }

    //     getData(ID_offer)
    // }, [ID_offer])

    const formatDate = (dateToFormat) => {
        const date = new Date(dateToFormat);

        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }


    return (
        <>
            <nav><Navbar /> </nav>

            {!isLoading ? (
                <div className="page__container single__offer__main__container">

                    <div className="page__container__template single__offer">
                        <div className="offer__card__general__info">
                            <h6>{singleOffer?.title}</h6>
                        </div>

                        {/* INFO EXTRA */}
                        <div className="offer__info__container">

                            <div className="offer__info__primary">
                                <div className="offer__item__info">
                                    <UserRound
                                        className="card__offer__icon"
                                    />
                                    <p>{singleOffer?.User.name}</p>
                                </div>
                                <div className="offer__item__info">
                                    <MapPin
                                        className="card__offer__icon"

                                    />
                                    <p>{singleOffer?.City.name}</p>
                                </div>
                                <div className="offer__item__info">
                                    <Laptop
                                        className="card__offer__icon"
                                    />
                                    <p>{singleOffer?.Modality.name}</p>

                                </div>
                            </div>

                            <div className="offer__info__secondary">
                                <div className="offer__item__info">
                                    <Calendar
                                        className="card__offer__icon"
                                    />
                                    <p>Disponible hasta: {formatDate(singleOffer?.deadline)}</p>
                                </div>

                            </div>

                        </div>

                        {/* FIN INFO EXTRA */}

                        <div className="offer__description">
                            <p dangerouslySetInnerHTML={{ __html: singleOffer?.description }} />
                        </div>

                        <div className="offer__card__range__salary">


                            <div className="offer__item__info">

                                <CircleDollarSign
                                    className="card__offer__icon"
                                />
                                Rango Salarial Disponible:
                                <p className="bold">
                                    {`${singleOffer?.salary_range_min}/${singleOffer?.salary_range_max}`}
                                </p>
                            </div>


                        </div>

                        {error &&
                            <>
                                <AlertToast message_toast='Ya has enviado tu postulación'></AlertToast>
                            </>
                        }


                        {errorLoading && (
                            <AlertToast
                                message_toast={errorMessage}
                            />
                        )}

                        {
                            (Role === 1 && (
                                <div className="button__container">
                                    <button className="bg-Primary btn-aplicar m-1 text-white" onClick={() => (applyjob(ID_offer))}>
                                        Aplicar
                                    </button>
                                </div>
                            ))
                        }



                    </div>

                    {/* UNCOMMENT CUANDO AGREGUEN EL ID DE USUARIO EN LA REPSUESTA */}

                    {Role === 2 && idUser === singleOffer?.User.ID_user && (
                        <>
                            <Suspense fallback={<Loader message='Cargando Postulantes' />}>
                                <ApplicationsList ID_offer={ID_offer} />
                            </Suspense>

                        </>
                    )}

                   
                    {/* {Role === 2 &&
                        <>
                            <Suspense fallback={<Loader message='Cargando Postulantes' />}>
                                <ApplicationsList ID_offer={ID_offer} />
                            </Suspense>

                        </>
                    } */}
                </div >
            ) :
                <Loader />
            }
        </>
    )
}


export default SingleJobOffer;