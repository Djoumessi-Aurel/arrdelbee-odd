import TabLinkType from "@/types/tabLinks";

// export const INFO_MANAGE_PATH:string = "/dashboard/evaluation-odd" 
export const INFO_MANAGE_PATH:string = "/dashboard/localites"
export const INFO_MANAGE_LINKS:Array<TabLinkType> = [
    {
        label: "Localité",
        href: `${INFO_MANAGE_PATH}`
    },
    {
        label: "Projets",
        href: `${INFO_MANAGE_PATH}/projets`
    },
    {
        label: "Projets ODD",
        href: `${INFO_MANAGE_PATH}/projets-odd`
    },
    {
        label: "ODD",
        href: `${INFO_MANAGE_PATH}/odd`
    }
]