'use client'
import React, { useRef, useState } from 'react'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Localite } from '@/types';


export default function LocalitePage() {

    const router = useRouter()

    const localiteArray = useSelector<RootState, Localite[]>((state) => state.localite.array);

    const actionBodyTemplate = (localite: Localite) => {
        return(
            <div className='flex justify-between place-items-center'>
                <FontAwesomeIcon icon={faArrowRight} title="Voir les projets de cette localité" className='hover:text-blue-500 text-xl'
                onClick={()=>{viewProject(localite.id)}}
                />
            </div>
        )
    };

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
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
            <h1 className='uppercase py-2 text-center'>Liste des localités</h1>

            <DataTable value={localiteArray} removableSort tableStyle={{ minWidth: '50rem' }}
            dataKey="id" filters={filters} filterDisplay="row"
            globalFilterFields={['id', 'name']} header={header} emptyMessage="Aucune donnée à afficher."
            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            selectionMode="single"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <Column field="id" header="N°" sortable style={{ width: '20%' }} filter filterPlaceholder="Recherche par numéro"></Column>
                <Column field="name" header="Nom" sortable style={{ width: '70%' }} filter filterPlaceholder="Recherche par nom"></Column>
                <Column header="Action" body={actionBodyTemplate} style={{ width: '10%' }}></Column>
            </DataTable>
        </div>
    );

    function viewProject(localiteId: string | number){

        //On va à la page d'affichage des projets de la localité
        router.push(`/dashboard/projets?localite=${localiteId}`)
    }

}
