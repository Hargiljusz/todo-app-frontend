import { useParams } from "react-router-dom";

export default function ShowToDoId() {
    const {id} = useParams()

    console.log(id)
        return(<span>ID: {id}</span>)
}