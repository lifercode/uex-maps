import { useState, useEffect, useCallback } from "react";

import { LocalesService } from "../services/locales";

interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

export function useLocales() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

  const getAllStates = useCallback(async () => {
    const data: Estado[] = await LocalesService.getAllStates()
    if(data) {
      const estadosOrdenados = data.sort((a, b) => a.nome.localeCompare(b.nome));
      setEstados(estadosOrdenados);
    }
  }, [])

  const getAllCitiesByState = useCallback(async () => {
    const data: Cidade[] = await LocalesService.getAllCitiesByState(estadoSelecionado)
    if(data) {
      setCidades(data);
    }
  }, [estadoSelecionado])

  useEffect(() => {
    getAllStates()
  }, [getAllStates]);

  useEffect(() => {
    if (estadoSelecionado) {
      getAllCitiesByState()
    } else {
      setCidades([]);
    }
  }, [estadoSelecionado, getAllCitiesByState]);

  return {
    estados,
    cidades,
    estadoSelecionado,
    cidadeSelecionada,
    setEstadoSelecionado,
    setCidadeSelecionada,
  };
}