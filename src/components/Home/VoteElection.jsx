import { useState } from 'react';
import { useCookies } from "react-cookie";

function VoteElection({ election }) {
    const [localCount, setLocalCount] = useState(election.count);
    const [hasVoted, setHasVoted] = useState(false);
    const [cookies] = useCookies(["JWT"]);
    const jwTCookie = cookies.JWT;
    const voteUrl = `${window.url}/event/vote-by-id/${election.id}`;

    function handleClick() {
        fetch(voteUrl, {
            method: "POST",
            headers: {
                'JWT': jwTCookie,
            },
        })
            .then(async (response) => {
                if (!response.ok) throw new Error(await response.text());
                if(!hasVoted){
                    setHasVoted(true)
                    setLocalCount(prevCount => prevCount + 1);    
                }
                else{
                    setHasVoted(false)  
                    setLocalCount(prevCount => prevCount - 1); 
                }
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <li
            className={`Voto ${hasVoted ? 'active' : ''}`}
            onClick={handleClick}
        >
            Fecha: {election.date}, Votos: {localCount}
        </li>

    );
}

export default VoteElection;
