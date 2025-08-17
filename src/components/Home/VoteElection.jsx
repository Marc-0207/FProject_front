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
                console.log(jwTCookie)
                console.log(response.status);
                console.log(response.text);
                if (!response.ok) throw new Error(await response.text());
                if(!hasVoted){
                    setLocalCount(prevCount => prevCount + 1);
                    setHasVoted(true)
                }
                else{
                    setLocalCount(prevCount => prevCount - 1);
                    setHasVoted(false)  
                }
            })
            .catch((err) => console.log(err.message));
    }

    return (
        <li onClick={handleClick}>
            Fecha: {election.date}, Votos: {localCount}
        </li>
    );
}

export default VoteElection;
