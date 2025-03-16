import axios from "axios"

import {
  GET_ADDRESS_LOCALES_ERROR_MESSAGE,
  GET_CITIES_LOCALES_ERROR_MESSAGE,
  GET_GEOCODE_LOCALES_ERROR_MESSAGE,
  GET_STATES_LOCALES_ERROR_MESSAGE
} from "../constants/feedback-messages"
import { GEOCODE_API_URL, IBGE_API_URL, VIACEP_API_URL } from "../constants/urls"
import { MAPBOX_APIKEY } from "../lib/utils/env"
import { toast } from "../lib/utils/toast"

export const LocalesService = {

  getCoordinatesByAddress: async (fullAddress: string) => {
    try {
      const response = await axios.get(`${GEOCODE_API_URL}?q=${fullAddress}&access_token=${MAPBOX_APIKEY}`)
      const coordinates = response.data.features[0].geometry.coordinates
      return coordinates;
    } catch {
      toast(GET_GEOCODE_LOCALES_ERROR_MESSAGE);
      return null;
    }
  },

  getFullAddressBySearchTerm: async (searchTerm: string) => {
    try {
      const response = await axios.get(`${VIACEP_API_URL}/${searchTerm}/json/`)
      return response.data;
    } catch {
      toast(GET_ADDRESS_LOCALES_ERROR_MESSAGE);
      return null;
    }
  },

  getAllStates: async () => {
    try {
      const response = await axios.get(`${IBGE_API_URL}/localidades/estados`)
      const states = response.data;
      return states;
    } catch {
      toast(GET_STATES_LOCALES_ERROR_MESSAGE);
      return null;
    }
  },

  getAllCitiesByState: async (state: string) => {
    try {
      const response = await axios.get(`${IBGE_API_URL}/localidades/estados/${state}/municipios`)
      return response.data;
    } catch {
      toast(GET_CITIES_LOCALES_ERROR_MESSAGE);
      return null;
    }
  },

}