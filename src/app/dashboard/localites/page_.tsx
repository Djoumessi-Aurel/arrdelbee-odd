// 'use client'
// import React, { useRef, useState } from 'react'
// import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
// import { Column } from 'primereact/column';import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { Historique, HistoriqueExt, Type_zone, User } from '@/types';
// import moment from 'moment';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
// import StateService from '@/services/mainservice';
// import { addHistorique } from '@/store/features/historique';
// import { setStateData } from '@/store/features/statedata';
// import { useRouter } from 'next/navigation';
// import LoaderDot from '@/components/LoaderDot';
// import { Toast } from 'primereact/toast';
// import { FilterMatchMode } from 'primereact/api';
// import { InputText } from 'primereact/inputtext';


// export default function Historique() {

//     const dispatch = useDispatch()
//     const router = useRouter()
//     const [stateLoadId, setStateLoadId] = useState<number>(-1)

//     const user = useSelector<RootState, User>((state) => state.user.user);
//     const typeEtatArray = useSelector<RootState, any[]>((state) => state.typeEtat.array);
//     const paysArray = useSelector<RootState, any[]>((state) => state.pays.array);
//     const regionArray = useSelector<RootState, any[]>((state) => state.region.array);
//     const departementArray = useSelector<RootState, any[]>((state) => state.departement.array);
//     const communeArray = useSelector<RootState, any[]>((state) => state.commune.array);

//     const historique = useSelector<RootState, HistoriqueExt[]>(state => state.historique.array.map(
//         (value) => extendHistory(value)
//     )
//     .sort((a: HistoriqueExt, b: HistoriqueExt) => b.date_creation.getTime() - a.date_creation.getTime()))

//     const dateBodyTemplate = (hist: HistoriqueExt) => {
//         return moment(hist.date_creation).format('DD/MM/YYYY [à] HH:mm')
//     };
//     const typeZoneBodyTemplate = (hist: HistoriqueExt) => {
//         return Type_zone[hist.type_zone]
//     };
//     const actionBodyTemplate = (hist: HistoriqueExt) => {
//         return(
//             <div className='flex justify-between place-items-center'>
//                 <FontAwesomeIcon icon={faArrowsRotate} title="Regénérer l'état" className='hover:text-blue-500'
//                 onClick={()=>{regenererEtat(hist.id, hist.numero_etat, hist.type_zone, hist.code_zone)}} />
//                 {stateLoadId == hist.id && <LoaderDot/>}
//             </div>
//         )
//     };

//     const [filters, setFilters] = useState<DataTableFilterMeta>({
//         global: { value: null, matchMode: FilterMatchMode.CONTAINS },
//         utilisateur: { value: null, matchMode: FilterMatchMode.CONTAINS },
//         nom_etat: { value: null, matchMode: FilterMatchMode.CONTAINS },
//         type_zone_s: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
//         nom_zone: { value: null, matchMode: FilterMatchMode.CONTAINS },
//     });

//     const [globalFilterValue, setGlobalFilterValue] = useState<string>('')
    
//     const toast = useRef<any>()

//     const showErrorToast = () => {
//         toast.current.show({ severity: 'error', summary: "Echec de la génération de l'état",
//         detail: 'Vérifiez votre connexion internet.', life: 4000 });
//     };

//     const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         let _filters = { ...filters };

//         // @ts-ignore
//         _filters['global'].value = value;

//         setFilters(_filters);
//         setGlobalFilterValue(value);
//     };

//     const renderHeader = () => {
//         return (
//             <div className="flex justify-content-end">
//                 <span className="p-input-icon-left">
//                     <i className="pi pi-search" />
//                     <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Recherche..." />
//                 </span>
//             </div>
//         );
//     };

//     const header = renderHeader();


//     return (
//         <div className="card">
//             <Toast ref={toast} />
//             <h1 className='uppercase py-2 text-center'>Historique des états générés</h1>

//             <DataTable value={historique} removableSort tableStyle={{ minWidth: '50rem' }}
//             dataKey="id" filters={filters} filterDisplay="row"
//             globalFilterFields={['utilisateur', 'nom_etat', 'type_zone', 'nom_zone']} header={header} emptyMessage="Aucune donnée à afficher."
//             paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
//             selectionMode="single"
//             paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
//             currentPageReportTemplate="{first} to {last} of {totalRecords}"
//             >
//                 <Column field="date_creation" header="Date" body={dateBodyTemplate} sortable style={{ width: '20%' }}></Column>
//                 <Column field="utilisateur" header="Utilisateur" sortable style={{ width: '20%' }} filter filterPlaceholder="Recherche par nom d'utilisateur"></Column>
//                 <Column field="nom_etat" header="Etat" sortable style={{ width: '20%' }} filter filterPlaceholder="Recherche par nom d'état"></Column>
//                 <Column field="type_zone_s" header="Type zone" sortable style={{ width: '20%' }} filter filterPlaceholder="Recherche par type de zone"></Column>
//                 <Column field="nom_zone" header="Nom zone" sortable style={{ width: '20%' }} filter filterPlaceholder="Recherche par nom de zone"></Column>
//                 <Column header="Action" body={actionBodyTemplate} style={{ width: '10%' }}></Column>
//             </DataTable>
//         </div>
//     );


//     function extendHistory (hist: Historique): HistoriqueExt {
//         let result: HistoriqueExt = {...hist, nom_etat: '', type_zone_s: '', nom_zone: ''}

//         result.date_creation = moment(hist.date_creation).toDate()
//         result.type_zone_s = Type_zone[hist.type_zone]

//         let typeEtat = typeEtatArray.find((value) => value.numero == hist.numero_etat);
//         result.nom_etat = typeEtat?.titre

//         let zone: any;
    
//         if (hist.type_zone == Type_zone.Pays){
//             zone = paysArray.find((value) => value.code_pays == hist.code_zone);
//         }    
//         else if (hist.type_zone == Type_zone.Region){
//             zone = regionArray.find((value) => value.code_region == hist.code_zone);
//         }
//         else if (hist.type_zone == Type_zone.Departement){
//             zone = departementArray.find((value) => value.code_departement == hist.code_zone);
//         }    
//         else if (hist.type_zone == Type_zone.Commune){
//             zone = communeArray.find((value) => value.code_commune == hist.code_zone);
//         }

//         result.nom_zone = zone?.nom
    
//         return result
//     }

//     async function regenererEtat(histId: number, numero_etat: number, type_zone: Type_zone, code_zone: number){
        
//         try {
//             let _histId = histId
//             setStateLoadId(histId);
//             let data = await StateService.getState2(numero_etat, type_zone, code_zone)
//             setStateLoadId(-1)

//             if(_histId === histId){
//                 if(data && data.code_zone != -1){ //L'état a été obtenu, il faut le marquer dans l'historique
//                     let hist = await StateService.saveHistory(numero_etat, type_zone, code_zone, user.nom)
//                     dispatch(addHistorique(hist))
//                 }
    
//                 dispatch(setStateData(data))
//                 //On va à la page d'affichage de l'état
//                 router.push(`/editions/show?n_etat=${numero_etat}&t_zone=${type_zone}&c_zone=${code_zone}`)
//             }

//         } catch (error: any) {
//             setStateLoadId(-1)
//             showErrorToast()
//             console.log(error.request?.status, error.message, error.response?.data)
//             dispatch(setStateData(0)) // on et met statedata à 0 lorsqu'il y a eu erreur
//         }
//     }

// }
