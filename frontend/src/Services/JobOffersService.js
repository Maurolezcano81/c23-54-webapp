import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { baseUrl, endpointsUrls } from "../constants";
import api from "./api";

export const JobOffersService = () => {
    const { Token, idUser } = useContext(AuthContext);

    const getAllOffers = async () => {
        const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_OFFERS}`

        const response = await api.get(apiUrl)

        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }

        return {
            response: response.data,
            status: response.status,
            message: response.message
        }
    }

    const CreateJobOffer = async (data) => {
        const apiUrl = `${baseUrl}${endpointsUrls.C_JOB_OFFERS}`

        const dataTocreate = {
            ...data,
            publication_date: new Date(),
            status: "open",
            ID_user: idUser
        }

        const response = await api.post(apiUrl, {dataTocreate})

        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }

        return {
            response: response.data,
            status: response.status,
            message: response.message
        };
    }

    const getOfferById = async (ID_offer) => {
        const apiUrl = `${baseUrl}${endpointsUrls.RONE_JOB_OFFERS}/${ID_offer}`

        const response = await api.get(apiUrl)

        if (!response) {
            throw new Error("Error al obtener las ofertas de empleo");
        }

        return {
            data: await response.data,
            status: response.status,
            message: response.message
        }
    }


    const getApplicantsForOfferById = async (ID_offer) => {
        const apiUrl = `${baseUrl}${endpointsUrls.RALL_JOB_APLICATIONS_BY_OFFER}/${ID_offer}`

        const response = await api.get(apiUrl)

        if (!response) {
            throw new Error("Error al obtener los postulantes del empleo");
        }

        return {
            data: await response.data,
            status: response.status,
            message: response.message
        }
    }

    return { getAllOffers, CreateJobOffer, getOfferById, getApplicantsForOfferById }
}