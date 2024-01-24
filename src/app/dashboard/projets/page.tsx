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
import { Localite, Projet } from '@/types';
import { updateProjet } from '@/store/features/projet';


export default function ProjetPage() {

    const dispatch = useDispatch()

    const searchParams = useSearchParams()
    const n_localite = searchParams.get('localite')

    const router = useRouter()
    const [projectLoadId, setProjectLoadId] = useState<number>(-1)
    const localite = useSelector<RootState, Localite | undefined>((state) => state.localite.array.
    find((value) => value.id == n_localite));
    const projetArray = localite?.projets.map((value, index) => {return {...value, numero: index + 1};})

    const actionBodyTemplate = (projet: Projet) => {
        return(
            <div className='flex justify-between place-items-center'>
                <FontAwesomeIcon icon={faArrowRight} title="Gérer les ODD de ce projet" className='hover:text-blue-500 text-xl'
                onClick={()=>{
                if(!projet.localite) dispatch(updateProjet({...projet, localite: localite?.name}));
                viewProjectOdd(projet.id)}
                }
                />
                {projectLoadId == projet.id && <LoaderDot/>}
            </div>
        )
    };

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        numero: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState<string>('')
    
    const toast = useRef<any>()

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
            <Toast ref={toast} />
            <h1 className='uppercase py-2 text-center'>Liste des projets de la localité de 
            <span className='text-blue-500'> {localite?.name}</span></h1>

            <DataTable value={projetArray} removableSort tableStyle={{ minWidth: '50rem' }}
            dataKey="id" filters={filters} filterDisplay="row"
            globalFilterFields={['numero', 'name', 'description']} header={header} emptyMessage="Aucune donnée à afficher."
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            selectionMode="single"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <Column field="numero" header="N°" sortable style={{ width: '15%' }} filter filterPlaceholder="Recherche par numéro"></Column>
                <Column field="name" header="Nom" sortable style={{ width: '30%' }} filter filterPlaceholder="Recherche par nom"></Column>
                <Column field="description" header="Description" sortable style={{ width: '45%' }} filter filterPlaceholder="Recherche par description"></Column>
                <Column header="Action" body={actionBodyTemplate} style={{ width: '10%' }}></Column>
            </DataTable>
        </div>
    );

    function viewProjectOdd(projetId: string | number){

        //On va à la page où on gère les ODD du projet
        router.push(`/dashboard/projet-odd?projet=${projetId}`)
    }

}
