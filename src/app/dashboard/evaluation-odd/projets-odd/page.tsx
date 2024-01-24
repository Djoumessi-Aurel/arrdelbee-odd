import Link from "next/link";

export default function Page(){
    return(
        <div className="">
            {/* Put your Content Here */}
            
            <ul>

                
                <li>Éliminer la pauvreté sous toutes ses formes et partout dans le monde
                    <span style={{display: 'inline-block', marginLeft: '90px'}}>
  
                        <input type="file" name="filename"/>
                    </span> 
                </li>
                <li>Éliminer la faim, assurer la sécurité alimentaire
                    <span style={{display: 'inline-block', marginLeft: '270px'}}>
  
                         <input type="file" name="filename" />
                    </span> 
                </li>
                <li>Permettre à tous de vivre en bonne santé
                    <span style={{display: 'inline-block', marginLeft: '312px'}}>
  
                    <input type="file" name="filename"/>
                    </span> 
                </li>
                <li>Garantir l’accès de tous à des services d’alimentation en eau 
                    <span style={{display: 'inline-block', marginLeft: '155px'}}>
  
                    <input type="file" name="filename"/>
                    </span> 
                </li>
                <li>Garantir l’accès de tous à des services énergétiques fiables
                    <span style={{display: 'inline-block', marginLeft: '170px'}}>
  
                    <input type="file" name="filename" />
                    </span> 
                </li>
                <li>Établir des modes de consommation et de production durables
                    <span style={{display: 'inline-block', marginLeft: '140px'}}>
  
                    <input type="file" name="filename"/>
                    </span>
                </li>
                <li>Prendre d’urgence des mesures pour lutter contre les changements climatiques
                    <span style={{display: 'inline-block', marginLeft: '15px'}}>
  
                    <input type="file" name="filename" />
                    </span>
                </li>
            </ul>
        </div>
    )
}