'use client'
import React, { useRef, useState } from 'react'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import LoaderDot from '@/components/LoaderDot';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Localite, Odd, Projet } from '@/types';
import { updateProjet } from '@/store/features/projet';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import Loader from '@/components/Loader';
import MainService from '@/services/mainservice';


export default function ProjetPage() {

    const dispatch = useDispatch()

    const searchParams = useSearchParams()
    const n_projet = searchParams.get('projet')

    const router = useRouter()
    const projet = useSelector<RootState, Projet | undefined>((state) => state.projet.array.
    find((value) => value.id == n_projet));

    // console.log(projet?.objectifsDeDeveloppement)

    const [validating, setValidating] = useState<boolean>(false)
    const oddArray = useSelector<RootState, Odd[]>((state) => state.odd.array);
    const oddArray__ = [...oddArray].sort((a, b) => Number(a.id_odd) - Number(b.id_odd))

    const [selectedOdds, setSelectedOdds] = useState<Set<number> | undefined>(new Set<number>(
        projet?.objectifsDeDeveloppement.
        map((value: Odd) => Number(value.id_odd))
    ))

    const actionBodyTemplate = (odd: Odd) => {
        return(
            <div className='flex justify-between place-items-center'>
                <Checkbox onChange={(e: CheckboxChangeEvent)=>{
                    let _selectedOdds =selectedOdds ? new Set<number>(selectedOdds) : new Set<number>()
                    if(e.checked){
                        _selectedOdds.add(Number(odd.id_odd))
                        setSelectedOdds(_selectedOdds)
                    }
                    else{
                        _selectedOdds.delete(Number(odd.id_odd))
                        setSelectedOdds(_selectedOdds)
                    }
                }} checked={selectedOdds?.has(Number(odd.id_odd)) || false}></Checkbox>
            </div>
        )
    };

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id_odd: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState<string>('')
    
    const toast = useRef<any>()

    const showErrorToast = () => {
            toast.current.show({ severity: 'error', summary: "Echec de la mise à jour du projet",
            detail: 'Vérifiez votre connexion internet.', life: 4000 });
        };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Recherche..." />
                </span>
            </div>
        );
    };

    const header = renderHeader();


    return (
        <div className="card">
            {validating && <Loader/>}
            <Toast ref={toast} />
            <h2 className='py-2 text-center'>Localité de : <span className='text-blue-500'> {String(projet?.localite)}</span></h2>
            <h1 className='uppercase py-2 text-center'>Projet : <span className='text-blue-500'> {projet?.name}</span></h1>
            <div className='flex justify-between'>
                <h1 className='inline'>Cochez les Objectifs de développement durable (ODD) à ajouter au projet.</h1>
                <Button className='mr-4'
                onClick={()=>{saveProjectAndShow();}}>
                    Valider
                </Button>
            </div>

            <DataTable value={oddArray__} removableSort tableStyle={{ minWidth: '50rem' }}
            dataKey="id" filters={filters} filterDisplay="row"
            globalFilterFields={['numero', 'name', 'description']} header={header} emptyMessage="Aucune donnée à afficher."
            paginator rows={25} rowsPerPageOptions={[5, 10, 25, 50]}
            selectionMode="single"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <Column field="id_odd" header="N°" sortable style={{ width: '15%' }} filter filterPlaceholder="Recherche par numéro"></Column>
                <Column field="name" header="Nom" sortable style={{ width: '75%' }} filter filterPlaceholder="Recherche par nom"></Column>
                <Column header="Action" body={actionBodyTemplate} style={{ width: '10%' }}></Column>
            </DataTable>
            
        </div>
    );

    async function saveProjectAndShow(){
        if(!projet) return
        if(selectedOdds == undefined) return

        try {
                setValidating(true)

                let newOdds : Odd[] = []
                let tempOdd
                let myOdds = Array.from(selectedOdds).sort((a, b) => a - b)

                for(let odd_id of myOdds){
                    tempOdd = oddArray.find((value)=>value.id_odd == odd_id)
                    if(tempOdd) newOdds.push(tempOdd)
                }

                let projetToSave: Projet = {...projet, objectifsDeDeveloppement: newOdds }

                for(let odd of projet.objectifsDeDeveloppement){
                    // await MainService.removeODDFromProject(projet.id, odd.id_odd)
                }

                for(let odd of projetToSave.objectifsDeDeveloppement){
                    // await MainService.addODDToProject(projet.id, odd.id_odd)
                }

                dispatch(updateProjet(projetToSave))

                console.log("ODD sélectionnés", projetToSave.objectifsDeDeveloppement)
                
                setValidating(false)
        
                // On va à la page où on gère les ODD du projet
                router.push(`/dashboard/projet-plus-odd?projet=${projet.id}`)

            } catch (error: any) {
                setValidating(false)
                showErrorToast()
                console.log(error.request?.status, error.message, error.response?.data)
            }
    }

}
