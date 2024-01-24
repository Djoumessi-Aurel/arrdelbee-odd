"use client"

import Link from "next/link";
import { useState } from "react";


export default function Page(){
    const [dropdown, setDropdown] = useState(false);

    return(
        <div className=""style={{ display: 'flex' }}>
            {/* Put your Content Here */}
          <div>
          <div style={{ marginRight: '20px' }}>
           Region Centre
            
<li>
            <div onClick={e => setDropdown(el => !el)}>
                project
            </div>
            <div className={`${dropdown ? 'flex' : 'hidden'}`}>
                <ul>
                <li><Link href={"projets-odd"}>Eau</Link></li>
                <li><Link href={"projets-odd"}>Energie</Link></li>
                <li><Link href={"projets-odd"}>Habitat</Link></li>
                <li><Link href={"projets-odd"}>Sante</Link></li>
                <li><Link href={"projets-odd"}>Agriculture</Link></li>
                </ul>
            </div>
        
            
            </li>   
        </div>
        </div>

        <div>
        <div style={{ marginLeft: '20px' }}>
            Region Extreme Nord

        <li>
            <div onClick={e => setDropdown(el => !el)}>
                project
            </div>
            <div className={`${dropdown ? 'flex' : 'hidden'}`}>
                <ul>
                <li><Link href={"projets-odd"}>Eau</Link></li>
                <li><Link href={"projets-odd"}>Energie</Link></li>
                <li><Link href={"projets-odd"}>Habitat</Link></li>
                <li><Link href={"projets-odd"}>Sante</Link></li>
                <li><Link href={"projets-odd"}>Agriculture</Link></li>
                </ul>
            </div>
            
        </li> 
        </div>
        </div>

        <div>
        <div style={{ marginLeft: '20px' }}>
            Region Nord

        <li>
            <div onClick={e => setDropdown(el => !el)}>
                project
            </div>
            <div className={`${dropdown ? 'flex' : 'hidden'}`}>
                <ul>
                <li><Link href={"projets-odd"}>Eau</Link></li>
                <li><Link href={"projets-odd"}>Energie</Link></li>
                <li><Link href={"projets-odd"}>Habitat</Link></li>
                <li><Link href={"projets-odd"}>Sante</Link></li>
                <li><Link href={"projets-odd"}>Agriculture</Link></li>
                </ul>
            </div>
            
        </li> 
        </div>
        </div>

        <div>
        <div style={{ marginLeft: '20px' }}>
            Region Nord-Ouest

        <li>
            <div onClick={e => setDropdown(el => !el)}>
                project
            </div>
            <div className={`${dropdown ? 'flex' : 'hidden'}`}>
                <ul>
                <li><Link href={"projets-odd"}>Eau</Link></li>
                <li><Link href={"projets-odd"}>Energie</Link></li>
                <li><Link href={"projets-odd"}>Habitat</Link></li>
                <li><Link href={"projets-odd"}>Sante</Link></li>
                <li><Link href={"projets-odd"}>Agriculture</Link></li>
                </ul>
            </div>
            
        </li> 
        </div>
        </div>

        <div>
        <div style={{ marginLeft: '20px' }}>
            Region Littoral

        <li>
            <div onClick={e => setDropdown(el => !el)}>
                project
            </div>
            <div className={`${dropdown ? 'flex' : 'hidden'}`}>
                <ul>
                <li><Link href={"projets-odd"}>Eau</Link></li>
                <li><Link href={"projets-odd"}>Energie</Link></li>
                <li><Link href={"projets-odd"}>Habitat</Link></li>
                <li><Link href={"projets-odd"}>Sante</Link></li>
                <li><Link href={"projets-odd"}>Agriculture</Link></li>
                </ul>
            </div>
            
        </li> 
        </div>

        </div>

        <div>
        <div style={{ marginLeft: '20px' }}>
            Region Sud

        <li>
            <div onClick={e => setDropdown(el => !el)}>
                project
            </div>
            <div className={`${dropdown ? 'flex' : 'hidden'}`}>
                <ul>
                <li><Link href={"projets-odd"}>Eau</Link></li>
                <li><Link href={"projets-odd"}>Energie</Link></li>
                <li><Link href={"projets-odd"}>Habitat</Link></li>
                <li><Link href={"projets-odd"}>Sante</Link></li>
                <li><Link href={"projets-odd"}>Agriculture</Link></li>
                </ul>
            </div>
            
        </li> 
        </div>

        </div>

        <div>
        <div style={{ marginLeft: '20px' }}>
            Region Sud-Ouest

        <li>
            <div onClick={e => setDropdown(el => !el)}>
                project
            </div>
            <div className={`${dropdown ? 'flex' : 'hidden'}`}>
                <ul>
                <li><Link href={"projets-odd"}>Eau</Link></li>
                <li><Link href={"projets-odd"}>Energie</Link></li>
                <li><Link href={"projets-odd"}>Habitat</Link></li>
                <li><Link href={"projets-odd"}>Sante</Link></li>
                <li><Link href={"projets-odd"}>Agriculture</Link></li>
                </ul>
            </div>
            
        </li> 
        </div>

        </div>

        </div>

        
        
    )
}