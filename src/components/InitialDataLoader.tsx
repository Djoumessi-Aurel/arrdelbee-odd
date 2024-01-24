"use client"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch } from '@/store'
import { getLocalites } from '@/store/features/localite'

import Loader from './Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getProjets } from '@/store/features/projet'
import { getOdds } from '@/store/features/odd'
import { Localite, Odd, Projet } from '@/types'

/* Composant permettant de charger certaines données au lancement de l'application */
export default function InitialDataLoader() {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        dispatch(getLocalites())
        dispatch(getProjets())
        dispatch(getOdds())
    }, [])

    const localiteArray = useSelector<RootState, Localite[]>((state) => state.localite.array);
    const projetArray = useSelector<RootState, Projet[]>((state) => state.projet.array);
    const oddArray = useSelector<RootState, Odd[]>((state) => state.odd.array);

    const affiche = localiteArray.length == 0 || projetArray.length == 0 || oddArray.length == 0
     

    return affiche && <div className='absolute z-10 bottom-3 right-3'><Loader/></div>
}
