'use client'
import React, { useState } from 'react'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Projet } from '@/types';


export default function ProjetPage() {

    const dispatch = useDispatch()

    const searchParams = useSearchParams()
    const n_projet = searchParams.get('projet')

    const router = useRouter()
    const projet = useSelector<RootState, Projet | undefined>((state) => state.projet.array.
    find((value) => value.id == n_projet));

    const oddArray = projet?.objectifsDeDeveloppement
    let oddArray__
    if(oddArray) oddArray__ = [...oddArray].sort((a, b) => Number(a.id_odd) - Number(b.id_odd))

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // id_odd: { value: null, matchMode: FilterMatchMode.CONTAINS },
        // name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState<string>('')

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
            <h2 className='py-2 text-center'>Localité de : <span className='text-blue-500'> {String(projet?.localite)}</span></h2>
            <h1 className='uppercase py-2 text-center'>Projet : <span className='text-blue-500'> {projet?.name}</span></h1>
            <h1 className='text-lg'>Liste des Objectifs de développement durable (ODD) du projet.</h1>

            <DataTable value={oddArray__} removableSort tableStyle={{ minWidth: '50rem' }}
            dataKey="id" filters={filters} filterDisplay="row"
            globalFilterFields={['numero', 'name', 'description']} header={header} emptyMessage="Aucune donnée à afficher."
            paginator rows={25} rowsPerPageOptions={[5, 10, 25, 50]}
            selectionMode="single"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                {/* <Column field="id_odd" header="N°" sortable style={{ width: '15%' }}  filterPlaceholder="Recherche par numéro"></Column> */}
                <Column field="name" header="Nom" sortable filterPlaceholder="Recherche par nom"></Column>
            </DataTable>
            
        </div>
    );

}
